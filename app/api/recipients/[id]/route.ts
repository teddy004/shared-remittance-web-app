import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For demo purposes, skip token validation
    // const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    // if (!token) { /* validation */ }

    const response = await apiClient.recipients.getById(
      "demo_token",
      params.id
    );

    return NextResponse.json(response, {
      status: response.success ? 200 : 404,
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
