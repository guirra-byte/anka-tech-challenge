import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const backendServicesHealth = await axios.get(
      "http://localhost:3001/api/health"
    );

    return new Response("", {
      status: backendServicesHealth.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
          return NextResponse.json(
            { message: "[BACKEND_HEALTH:GET] - Error: Service Unavailable", error: error.message },
            { status: 500 }
          );
        }
  }
}
