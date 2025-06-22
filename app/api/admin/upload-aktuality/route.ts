import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    // Vytvoříme statický PDF pro aktuality
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(ZOD BOROVANY) Tj
0 -50 Td
/F1 18 Tf
(Přijmeme ošetřovatele/ku dojnic) Tj
0 -40 Td
/F1 12 Tf
(• požadujeme zájem o práci v živočišné výrobě) Tj
0 -20 Td
(• nástup možný ihned) Tj
0 -20 Td
(• měsíční mzda 32 000 – 38 000 Kč) Tj
0 -20 Td
(• roční prémie) Tj
0 -20 Td
(• dotované závodní stravování) Tj
0 -40 Td
(Kontakt: Ing. Ondřej Kubala) Tj
0 -20 Td
(tel.: 778 474 530) Tj
0 -20 Td
(email: info@zodborovany.cz) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000526 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
623
%%EOF`

    // Nahrajeme PDF do Vercel Blob
    const blob = await put("aktuality/nabidka-prace.pdf", pdfContent, {
      access: "public",
      contentType: "application/pdf",
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Chyba při vytváření PDF" }, { status: 500 })
  }
}
