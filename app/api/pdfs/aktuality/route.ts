import { NextResponse } from "next/server"

export async function GET() {
  // Vytvoříme jednoduchý PDF obsah pro aktuality
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
/Length 800
>>
stream
BT
/F1 24 Tf
150 700 Td
(ZOD BOROVANY) Tj
0 -30 Td
/F1 16 Tf
(www.zodborovany.cz) Tj
0 -60 Td
/F1 20 Tf
(Přijmeme ošetřovatele/ku dojnic) Tj
0 -50 Td
/F1 14 Tf
(• požadujeme zájem o práci v živočišné výrobě) Tj
0 -25 Td
(• nástup možný ihned) Tj
0 -25 Td
(• měsíční mzda 32 000 – 38 000 Kč) Tj
0 -25 Td
(• roční prémie) Tj
0 -25 Td
(• dotované závodní stravování) Tj
0 -50 Td
/F1 16 Tf
(Kontakt pro zájemce:) Tj
0 -30 Td
/F1 14 Tf
(Ing. Ondřej Kubala) Tj
0 -25 Td
(tel.: 778 474 530) Tj
0 -25 Td
(email: info@zodborovany.cz) Tj
0 -25 Td
(Vodárenská 97, 373 12 Borovany) Tj
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
0000001126 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
1223
%%EOF`

  return new NextResponse(pdfContent, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="aktuality-nabidka-prace.pdf"',
    },
  })
}
