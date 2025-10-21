import { type NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function GET(request: NextRequest) {
  try {
    // Demo - no auth required
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get("status") || undefined,
      type: searchParams.get("type") || undefined,
      limit: searchParams.get("limit")
        ? Number.parseInt(searchParams.get("limit")!)
        : undefined,
    };

    const response = await apiClient.transactions.getAll("demo_token", filters);

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
    // Demo - no auth required
    const body = await request.json();
    const response = await apiClient.transactions.create("demo_token", body);

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
