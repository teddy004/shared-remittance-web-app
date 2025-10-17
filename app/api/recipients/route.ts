import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";
import type { CreateRecipientRequest } from "@/lib/api-types";

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, skip token validation
    // const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    // if (!token) { /* validation */ }

    const response = await apiClient.recipients.getAll();

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

    const body: CreateRecipientRequest = await request.json();
    console.log("[v0] Creating recipient with data:", body);

    const response = await apiClient.recipients.create("demo_token", body);
    console.log("[v0] API client response:", response);

    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
    });
  } catch (error) {
    console.error("[v0] Error creating recipient:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
