import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function GET(request: NextRequest) {
  try {
    // Demo mode - no auth required
    const response = await apiClient.wallet.getBalance("demo_token");

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
