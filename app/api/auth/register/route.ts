import { type NextRequest, NextResponse } from "next/server"
import { apiClient } from "@/lib/api-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await apiClient.auth.register(body)

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
