import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function POST(request: NextRequest) {
  try {
    // Demo mode - no auth required
    const body = await request.json();
    const response = await apiClient.sendMoney.initiate(undefined, body);

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
