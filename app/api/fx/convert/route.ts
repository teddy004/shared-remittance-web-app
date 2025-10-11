import { type NextRequest, NextResponse } from "next/server"
import { apiClient } from "@/lib/api-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from") || "USD"
    const to = searchParams.get("to") || "ETB"
    const amount = Number.parseFloat(searchParams.get("amount") || "0")

    if (amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid amount",
          },
        },
        { status: 400 },
      )
    }

    const response = await apiClient.fx.calculateConversion(from, to, amount)

    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Internal server error",
        },
      },
      { status: 500 },
    )
  }
}
