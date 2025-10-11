import { type NextRequest, NextResponse } from "next/server"
import { apiClient } from "@/lib/api-client"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "AUTH_007",
            message: "No authorization token provided",
          },
        },
        { status: 401 },
      )
    }

    const body = await request.json()
    const response = await apiClient.compliance.reportSuspiciousActivity(token, body)

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
