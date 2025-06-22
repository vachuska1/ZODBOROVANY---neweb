import { NextResponse } from "next/server"

export async function GET() {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="cs">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jídelní lístek - Týden 2</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                padding: 40px; 
                text-align: center;
                background-color: #f9f9f9;
                color: #666;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .logo {
                color: #16a34a;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .message {
                font-size: 18px;
                margin-bottom: 20px;
            }
            .info {
                font-size: 14px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">ZOD Borovany</div>
            <div class="message">
                <h2>Jídelní lístek - Týden 2</h2>
                <p>Jídelní lístek zatím není nahrán.</p>
            </div>
            <div class="info">
                <p>Pro nahrání nového jídelního lístku se přihlaste do administrace.</p>
            </div>
        </div>
    </body>
    </html>
  `

  return new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
