"use client";

import Layout from "@/components/ankaui/layout";
import BackendStatus from "@/components/ankaui/backend-health";
import { useAssets } from "@/hooks/useAssets";
import { Card, CardContent } from "@/components/ui/card";
import { Pin } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ListaTodosAtivos() {
  const { assets, pinned, togglePin } = useAssets();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="top-0 z-50 backdrop-blur-lg border-b border-dashed">
          <BackendStatus />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Painel de Ativos Financeiros
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <Card
              key={asset.id}
              className="relative bg-white/5 border border-border dark:bg-zinc-900 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {asset.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">ID: {asset.id}</p>
                    <div
                      className={`text-sm font-mono ${
                        asset.variation >= 0 ? "text-emerald-600" : "text-pink-700"
                      }`}
                    >
                      {asset.variation >= 0 ? "+" : ""}
                      {asset.variation.toFixed(2)}%
                    </div>
                  </div>

                  <button
                    onClick={() => togglePin(asset.id)}
                    className="text-orange-600 hover:text-orange-400 transition"
                    title="Fixar ativo no painel de Clientes"
                  >
                    <Pin
                      className={`w-4 h-4 ${
                        pinned.includes(asset.id) ? "fill-orange-600" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="text-lg font-semibold font-mono">
                  R$ {(asset.mockHistory.at(-1)?.amount ?? 0).toFixed(2)}
                </div>

                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={asset.mockHistory}>
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                        labelFormatter={(label) => `Dia: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke={asset.variation >= 0 ? "#059669" : "#db2777"}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}