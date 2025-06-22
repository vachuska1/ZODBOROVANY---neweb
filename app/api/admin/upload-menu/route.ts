import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const week = formData.get("week") as string

    if (!file || !week) {
      return NextResponse.json({ error: "Chybí soubor nebo týden" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Pouze PDF soubory jsou povolené" }, { status: 400 })
    }

    // Upload file to Vercel Blob with a unique name based on timestamp
    const timestamp = new Date().getTime()
    const fileName = `menu/${week}-${timestamp}.pdf`

    const blob = await put(fileName, file, {
      access: "public",
    })

    // Store the URL in a database or return it to be stored in state
    return NextResponse.json({
      success: true,
      message: `Soubor pro ${week === "week1" ? "Týden 1" : "Týden 2"} byl úspěšně nahrán`,
      url: blob.url,
      week: week,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Chyba při nahrávání souboru" }, { status: 500 })
  }
}
