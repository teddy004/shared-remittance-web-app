import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Demo - no auth required
    const response = await apiClient.moneyRequests.cancel(
      "demo_token",
      params.id
    );

    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
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
