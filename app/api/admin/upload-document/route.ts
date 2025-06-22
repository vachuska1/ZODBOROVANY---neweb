import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "https://romantic-hound-16277.upstash.io",
  token: process.env.KV_REST_API_TOKEN || "AT-VAAIjcDFmMWYxNGY3MWU2NmY0OTVlODMyMTc4ZWZjOWFkMGVmY3AxMA",
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string

    if (!file || !documentType) {
      return NextResponse.json({ error: "Chybí soubor nebo typ dokumentu" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Pouze PDF soubory jsou povolené" }, { status: 400 })
    }

    // Upload file to Vercel Blob
    const timestamp = new Date().getTime()
    const fileName = `documents/${documentType}-${timestamp}.pdf`

    const blob = await put(fileName, file, {
      access: "public",
    })

    // Store the URL in Redis
    await redis.set(`document:${documentType}`, blob.url)

    return NextResponse.json({
      success: true,
      message: `${documentType} byl úspěšně nahrán`,
      url: blob.url,
      documentType: documentType,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Chyba při nahrávání souboru" }, { status: 500 })
  }
}
