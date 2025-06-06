import axios from "axios";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();

  try {
    const reply = await axios.post(`http://localhost:3001/api/clients/upload`, data);

    return new Response(JSON.stringify(reply.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.cause);
      return NextResponse.json(
        { message: "[CLIENTS_UPLOAD:POST] - Error: ", error: error.message },
        { status: 500 }
      );
    }
  }
}
