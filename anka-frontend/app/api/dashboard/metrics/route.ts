import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reply = await axios.get(
      "http://localhost:3001/api/dashboard/metrics"
    );

    return new Response(JSON.stringify(reply.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "[METRICS_DASHBOARD:GET] - Error: ", error: error.message },
        { status: 500 }
      );
    }
  }
}
