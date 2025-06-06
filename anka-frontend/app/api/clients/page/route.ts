import axios from "axios";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = (await request.json()) as { page: number };

  try {
    const reply = await axios.get(
      `http://localhost:3001/api/clients/${data.page}`
    );

    return new Response(JSON.stringify(reply.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "[PAGINATION_CLIENT:POST]- Error: ", error: error.message },
        { status: 500 }
      );
    }
  }
}
