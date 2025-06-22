import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 })
  }

  const fileMap: Record<string, string> = {
    aktuality: "https://blob.v0.dev/aktuality-nabidka-prace.pdf",
    dotace: "https://blob.v0.dev/pjtmy8OGJ.pdf",
    stanovy: "https://blob.v0.dev/pjtmy8OGK.pdf",
    vos: "https://blob.v0.dev/pjtmy8OGL.pdf",
  }

  const pdfUrl = fileMap[file]

  if (!pdfUrl) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  try {
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      throw new Error("PDF not found")
    }

    const pdfBuffer = await response.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${file}.pdf"`,
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    console.error("Error serving PDF:", error)
    return NextResponse.json({ error: "PDF not found" }, { status: 404 })
  }
}
