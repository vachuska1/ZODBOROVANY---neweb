import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

// This endpoint will be used to generate and store default PDFs for the menu
export async function GET() {
  try {
    // Generate default PDFs for week1 and week2
    const week1Response = await fetch(
      `${process.env.VERCEL_URL || "http://localhost:3000"}/api/menu/generate-default-pdf?week=week1`,
    )
    const week2Response = await fetch(
      `${process.env.VERCEL_URL || "http://localhost:3000"}/api/menu/generate-default-pdf?week=week2`,
    )

    const week1Html = await week1Response.text()
    const week2Html = await week2Response.text()

    // Store the HTML content as files in Vercel Blob
    const week1Blob = await put(`menu/default-week1.html`, week1Html, {
      access: "public",
      contentType: "text/html",
    })

    const week2Blob = await put(`menu/default-week2.html`, week2Html, {
      access: "public",
      contentType: "text/html",
    })

    // Update the menu URLs
    await fetch("/api/menu/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        week: "week1",
        url: week1Blob.url,
      }),
    })

    await fetch("/api/menu/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        week: "week2",
        url: week2Blob.url,
      }),
    })

    return NextResponse.json({
      success: true,
      week1Url: week1Blob.url,
      week2Url: week2Blob.url,
    })
  } catch (error) {
    console.error("Error generating default PDFs:", error)
    return NextResponse.json({ error: "Error generating default PDFs" }, { status: 500 })
  }
}
