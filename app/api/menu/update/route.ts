import { type NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Vytvoření Redis klienta s vašimi credentials
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

export async function POST(request: NextRequest) {
  try {
    const { week, url } = await request.json()

    if (!week || !url) {
      return NextResponse.json({ error: "Chybí týden nebo URL" }, { status: 400 })
    }

    if (week !== "week1" && week !== "week2") {
      return NextResponse.json({ error: "Neplatný týden" }, { status: 400 })
    }

    // Uložení URL do Redis
    await redis.set(`menu:${week}`, url)

    console.log(`Updated ${week} to: ${url}`)

    return NextResponse.json({
      success: true,
      message: `URL pro ${week === "week1" ? "Týden 1" : "Týden 2"} byla úspěšně aktualizována`,
    })
  } catch (error) {
    console.error("Update menu error:", error)
    return NextResponse.json({ error: "Chyba při aktualizaci menu" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Získání URL z Redis
    const week1Url = await redis.get<string>(`menu:week1`)
    const week2Url = await redis.get<string>(`menu:week2`)

    return NextResponse.json({
      week1Url: week1Url || "/api/menu/default/week1",
      week2Url: week2Url || "/api/menu/default/week2",
    })
  } catch (error) {
    console.error("Get menu error:", error)
    return NextResponse.json(
      {
        week1Url: "/api/menu/default/week1",
        week2Url: "/api/menu/default/week2",
      },
      { status: 500 },
    )
  }
}
