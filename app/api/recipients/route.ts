import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, skip token validation
    // const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    // if (!token) { /* validation */ }

    const response = await apiClient.recipients.getAll("demo_token");

    return NextResponse.json(response, {
      status: response.success ? 200 : 500,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For demo purposes, skip token validation
    // const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    // if (!token) { /* validation */ }

    const body = await request.json();
    const response = await apiClient.recipients.create("demo_token", body);

    return NextResponse.json(response, {
      status: response.success ? 200 : 500,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
