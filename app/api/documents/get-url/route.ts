import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const documentType = searchParams.get("type")

  if (!documentType) {
    return NextResponse.json({ error: "Missing document type" }, { status: 400 })
  }

  try {
    // Get URL from Redis
    const documentUrl = await redis.get<string>(`document:${documentType}`)

    return NextResponse.json({
      url: documentUrl || `/api/pdfs/${documentType}`,
    })
  } catch (error) {
    console.error("Get document error:", error)
    return NextResponse.json({
      url: `/api/pdfs/${documentType}`,
    })
  }
}
