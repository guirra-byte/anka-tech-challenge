import { app } from "../app/app.ts";

import { pipeline } from "node:stream";
import { promisify } from "node:util";
import type { FastifyReply, FastifyRequest } from "fastify";
import csv from "csv-parser";

import { fastifyMultipart } from "@fastify/multipart";
import rateLimit from "@fastify/rate-limit";
import fastifyCors from "@fastify/cors";

import { lookupCache } from "../middleware/lookup-cache.ts";
import { invalidateCachePrefix } from "../../utils/invalidate-cache.ts";
import {
  CreateClientSchema,
  EditClientSchema,
  type CsvDataDTO,
  type NewClientProps,
  type CsvRowAllocationAssertion,
} from "../../types/types.ts";
import { prisma } from "../lib/prisma/index.ts";
import { redis } from "../lib/cache/index.ts";

app.register(fastifyMultipart, {
  limits: {
    files: 1,
    fileSize: 20_971_520,
  },
});

app.register(rateLimit, {
  max: 20,
  timeWindow: "1 minute",
  allowList: ["/api/health"],
  hook: "onRequest",
  addHeaders: {
    "x-ratelimit-limit": true,
    "x-ratelimit-remaining": true,
    "x-ratelimit-reset": true,
  },
});

await app.register(fastifyCors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET"],
});

const pump = promisify(pipeline);
const processRows = async (rows: CsvRowAllocationAssertion[]) => {
  const groupedRows = new Map<string, CsvRowAllocationAssertion[]>();

  for (const row of rows) {
    const email = row.email;
    if (!groupedRows.has(email)) {
      groupedRows.set(email, []);
    }

    groupedRows.get(email)!.push(row);
  }

  for (const [email, emailRows] of groupedRows.entries()) {
    for (const row of emailRows) {
      try {
        await prisma.$transaction(async (tx) => {
          let asset = await tx.asset.findUnique({
            where: { name: row.asset.name },
          });

          if (!asset) {
            asset = await tx.asset.create({
              data: {
                name: row.asset.name,
              },
            });
          }

          let client = await tx.client.findUnique({
            where: { email },
          });

          if (!client) {
            client = await tx.client.create({
              data: {
                email,
                name: row.name,
                active: row.active,
                imported: true,
              },
            });
          }

          await tx.allocation.create({
            data: {
              clientId: client.id,
              assetId: asset.id,
              investedValue: row.invested_value,
              at: row.at,
            },
          });
        });
      } catch (err: any) {
        if (err.code === "P2002") {
          console.warn(
            `Cliente com email ${row.email} já criado por outra transação.`
          );
        } else {
          console.error("Erro ao processar linha:", err);
        }
      }
    }
  }
};

app.route({
  method: "POST",
  url: "/api/clients/upload",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await request.file();
    if (!data) {
      return reply
        .status(400)
        .send({ message: "Uploaded file was not found!" });
    }

    reply
      .status(200)
      .send({ message: "Uploaded file was received. Process was initiated." });

    try {
      let batchSize = 200;
      let batchRows: CsvRowAllocationAssertion[] = [];

      const clientIp = request.ip;
      await pump(data.file.pipe(csv()), async function* (source) {
        for await (const row of source) {
          const rowAssertion = row as CsvDataDTO;

          const transformedRow: CsvRowAllocationAssertion = {
            at: rowAssertion.at,
            email: rowAssertion.email,
            name: rowAssertion.name,
            active: rowAssertion.active?.toLowerCase() !== "false",
            invested_value: rowAssertion.investedValue,
            asset: {
              name: rowAssertion.asset_name,
            },
          };

          batchRows.push(transformedRow);

          if (batchRows.length === batchSize) {
            await processRows(batchRows);
            batchRows = [];
          }
        }

        if (batchRows.length > 0) {
          await processRows(batchRows);
        }
      }).then(async () => await notifyClients(sseAppClients, clientIp));
    } catch (error) {
      console.error("[UPLOAD_CSV] - Error:", error);
    }
  },
});

const sseAppClients: Record<string, FastifyReply[]> = {};
async function notifyClients(
  clients: Record<string, FastifyReply[]>,
  ip: string
) {
  if (clients[ip]) {
    clients[ip].map((client) => {
      client.raw.write(`data: [UPLOAD_CSV] - Success\n\n`);
    });
  }
}

app.route({
  method: "GET",
  url: "/api/clients/upload/events",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const clientIp = request.ip;
    console.log("[SSE_CLIENT] - Connection Stablished");

    const corsHeaders: { key: string; value: string }[] = [
      { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
      { key: "Access-Control-Allow-Methods", value: "GET" },
    ];

    const sseHeaders: { key: string; value: string }[] = [
      { key: "Content-Type", value: "text/event-stream" },
      { key: "Cache-Control", value: "no-cache" },
      { key: "Connection", value: "keep-alive" },
    ];

    const rawHeaders = [...corsHeaders, ...sseHeaders];
    rawHeaders.map((header) => {
      reply.raw.setHeader(header.key, header.value);
    });

    sseAppClients[`${clientIp}`] = [reply];
    request.raw.on("close", () => {
      const position = sseAppClients[`${clientIp}`].indexOf(reply);
      if (position !== -1) {
        sseAppClients[`${clientIp}`].splice(position, 1);
        console.log("[SSE_CLIENT] -- Connection Closed");
      }
    });

    reply.raw.write(
      `data: Connection with SSE Client has been stablished!\n\n`
    );
  },
});

app.route({
  method: "POST",
  url: "/api/client",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as {
      name: string;
      email: string;
      active: boolean;
      page: number;
    };

    const findByEmail = await prisma.client.findUnique({
      where: { email: data.email },
    });

    if (findByEmail) {
      return reply.status(409).send({ message: "E-mail already in use." });
    }

    const clientData = CreateClientSchema.parse(data);
    await prisma.client.create({ data: { ...clientData } });
    await invalidateCachePrefix(`cache:clients:page:${data.page}`);

    reply.status(201).send();
  },
});

app.route({
  method: "GET",
  url: "/api/client/:id",
  preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const cachedReply = await lookupCache(`client:${id}`);
    if (cachedReply) {
      return reply.send(JSON.parse(cachedReply)).status(200);
    }
  },
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const client = await prisma.client.findUnique({
      where: { id: id },
    });

    if (!client) return reply.send().status(404);
    redis.set(`client:${id}`, JSON.stringify(client));

    return reply.send(client);
  },
});

app.route({
  method: "GET",
  url: "/api/health",
  handler: async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send();
  },
});

app.route({
  method: "GET",
  url: "/api/dashboard/metrics",
  preHandler: async (_request: FastifyRequest, reply: FastifyReply) => {
    const cachedReply = await lookupCache(`cache:dashboard:metrics`);
    if (cachedReply) {
      return reply.send(JSON.parse(cachedReply)).status(200);
    }
  },
  handler: async (_request: FastifyRequest, reply: FastifyReply) => {
    const [totalClients, totalAssets, totalUnactiveClients] = await Promise.all(
      [
        prisma.client.count(),
        prisma.asset.count(),
        prisma.client.count({ where: { active: false } }),
      ]
    );

    const payload = { totalClients, totalAssets, totalUnactiveClients };
    if (totalClients > 0 || totalAssets > 0 || totalUnactiveClients > 0) {
      redis.set("cache:dashboard:metrics", JSON.stringify(payload));
    }

    return reply.send(payload).status(200);
  },
});

app.route({
  method: "GET",
  url: "/api/clients/:page",
  preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const { page } = request.params as { page: string };
    const requestedPage = Number(page ?? 1);
    if (isNaN(requestedPage) || requestedPage < 1) {
      throw new Error("Unavailable page.");
    }

    const totalClients = await prisma.client.count();
    const totalPages = Math.floor(totalClients / 50);
    if (requestedPage > totalPages) {
      throw new Error("Unavailable page.");
    }

    const cachedReply = await lookupCache(
      `cache:clients:page:${Number(requestedPage)}`
    );

    if (cachedReply) {
      return reply
        .send({ clients: JSON.parse(cachedReply), count: totalClients })
        .status(200);
    }
  },
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const { page } = request.params as { page: string };
    const requestedPage = Number(page);
    const cacheKey = `cache:clients:page:${requestedPage}`;

    const totalClients = await prisma.client.count();
    let pageData = await redis.get(cacheKey);

    if (!pageData) {
      const clients = await prisma.client.findMany({
        take: 50,
        skip: (requestedPage - 1) * 50,
        include: { Allocation: { include: { Asset: true } } },
        orderBy: { createdAt: "desc" },
      });

      if (!clients.length) {
        throw new Error("Unavailable page.");
      }

      await redis.set(cacheKey, JSON.stringify(clients));
      pageData = JSON.stringify(clients);
    }

    return reply
      .send({ clients: JSON.parse(pageData), count: totalClients })
      .status(200);
  },
});

function listenChangedFields<T extends Record<string, any>>(
  original: T,
  updated: Partial<T>
): Boolean {
  let changes: boolean = false;
  for (const key of Object.keys(updated)) {
    if (updated[key] !== original[key]) {
      changes = true;
    }
  }

  return changes;
}

app.route({
  method: "PATCH",
  url: "/api/client/:id",
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const { bodyPayload } = request.body as { bodyPayload: NewClientProps };

    const editData = EditClientSchema.parse(bodyPayload);

    try {
      const existingClient = await prisma.client.findUnique({
        where: { id },
      });

      if (!existingClient) {
        return reply.status(404).send({ message: "Client not found." });
      }

      const emailInUse = await prisma.client.findUnique({
        where: { email: editData.email },
      });

      const emailExists =
        editData.email &&
        editData.email !== existingClient.email &&
        !emailInUse;

      if (emailExists) {
        return reply.status(409).send({ message: "E-mail already in use." });
      }

      const updatedData = {
        name: bodyPayload.name ?? existingClient.name,
        email: bodyPayload.email ?? existingClient.email,
        active:
          typeof bodyPayload.active === "boolean"
            ? bodyPayload.active
            : existingClient.active,
      };

      const hasChanges = listenChangedFields(existingClient, updatedData);
      if (!hasChanges) {
        return reply.status(304).send();
      }

      const clientCacheKey = `client:${id}`;
      await prisma.$transaction(async (tx) => {
        await tx.client.update({
          where: { id },
          data: updatedData,
        });

        await redis.del(clientCacheKey);
        await redis.set(clientCacheKey, JSON.stringify(updatedData));
      });

      await invalidateCachePrefix("cache");

      return reply
        .status(200)
        .send({ message: "Client updated successfully." });
    } catch (error) {
      console.error("Error updating client:", error);
      return reply.status(500).send({ error: "Internal server error." });
    }
  },
});

app.route({
  url: "/api/assets",
  method: "GET",
  preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const cachedReply = await lookupCache("assets");

    if (cachedReply) {
      return reply.send(JSON.parse(cachedReply)).status(200);
    }
  },
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    const assets = await prisma.asset.findMany();

    if (!assets.length) {
      throw new Error("Unavailable page.");
    }

    await redis.set("assets", JSON.stringify(assets));
    return reply.send(assets).status(200);
  },
});
