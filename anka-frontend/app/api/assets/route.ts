import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reply = await axios.get(
      "http://localhost:3001/api/assets"
    );

    return new Response(JSON.stringify(reply.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "[ASSETS:GET] - Error: ", error: error.message },
        { status: 500 }
      );
    }
  }
}
