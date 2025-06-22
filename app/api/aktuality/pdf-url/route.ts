import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

export async function GET() {
  try {
    // Zkusíme získat URL z Redis
    let pdfUrl = await redis.get<string>("aktuality:pdf-url")

    if (!pdfUrl) {
      // Pokud neexistuje, vytvoříme nový PDF
      const uploadResponse = await fetch("/api/admin/upload-aktuality", {
        method: "POST",
      })

      if (uploadResponse.ok) {
        const data = await uploadResponse.json()
        pdfUrl = data.url
        // Uložíme do Redis
        await redis.set("aktuality:pdf-url", pdfUrl)
      } else {
        // Fallback na API route
        pdfUrl = "/api/pdfs/aktuality"
      }
    }

    return NextResponse.json({
      pdfUrl: pdfUrl || "/api/pdfs/aktuality",
    })
  } catch (error) {
    console.error("Get aktuality PDF error:", error)
    return NextResponse.json({
      pdfUrl: "/api/pdfs/aktuality",
    })
  }
}
