import { type NextRequest, NextResponse } from "next/server"
import { apiClient } from "@/lib/api-client"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const response = await apiClient.auth.sendOTP(email)

    return NextResponse.json(response)
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
