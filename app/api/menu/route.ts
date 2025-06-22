import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Vytvoření Redis klienta s vašimi credentials
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

export async function GET() {
  try {
    // Získání URL z Redis
    const week1Url = (await redis.get<string>(`menu:week1`)) || "/api/menu/generate-default-pdf?week=week1"
    const week2Url = (await redis.get<string>(`menu:week2`)) || "/api/menu/generate-default-pdf?week=week2"

    return NextResponse.json({
      week1Url,
      week2Url,
    })
  } catch (error) {
    console.error("Get menu error:", error)
    return NextResponse.json(
      {
        week1Url: "/api/menu/generate-default-pdf?week=week1",
        week2Url: "/api/menu/generate-default-pdf?week=week2",
      },
      { status: 500 },
    )
  }
}
