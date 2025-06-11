import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = (await request.json()) as {
    name: string;
    email: string;
    active: boolean;
  };

  try {
    const reply = await axios.post(`http://localhost:3001/api/client`, {
      ...data,
    });

    return new Response(JSON.stringify(reply.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.cause);
      return NextResponse.json(
        { message: "[NEW_CLIENT:POST] - Error: ", error: error.message },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(request: Request) {
  const data = (await request.json()) as {
    id: string;
    name: string;
    email: string;
    active: boolean;
    page: number
  };

  try {
    const bodyPayload = {
      name: data.name,
      email: data.email,
      active: data.active,
      page: data.page
    };

    const reply = await axios.patch(
      `http://localhost:3001/api/client/${data.id}`,
      {
        bodyPayload,
      }
    );

    return new Response(JSON.stringify(reply.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { message: "[EDIT_CLIENT:PATCH] - Error: ", error: error.message },
        { status: 500 }
      );
    }
  }
}
