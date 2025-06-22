import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Přesměrujeme na blob URL vašeho PDF
    const pdfUrl = "https://blob.v0.dev/aktuality-nabidka-prace.pdf"

    // Načteme PDF z blob URL
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      throw new Error("PDF not found")
    }

    const pdfBuffer = await response.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="aktuality-nabidka-prace.pdf"',
      },
    })
  } catch (error) {
    console.error("Error serving PDF:", error)
    return NextResponse.json({ error: "PDF not found" }, { status: 404 })
  }
}
