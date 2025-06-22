import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const week = searchParams.get("week")

  if (!week || (week !== "week1" && week !== "week2")) {
    return NextResponse.json({ error: "Invalid week parameter" }, { status: 400 })
  }

  // Data pro týden 1 (20. týden)
  const week1Data = {
    weekNumber: "20. týden",
    dateRange: "od: 12.5.2025    do: 16.5.2025",
    days: [
      {
        day: "Pondělí",
        soup: "Polévka slepičí vývar s nudlemi",
        main: "Hovězí maso vařené na kmíně a) těstoviny b) rýže",
        allergens: "1,3,7,9 / 1,3",
      },
      {
        day: "Úterý",
        soup: "Polévka pórková",
        main: "Kuřecí směs na smetaně s houbami, opečené brambory",
        allergens: "1,3,7 / 3,7",
      },
      {
        day: "Středa",
        soup: "Polévka frankfurtská s párkem",
        main: "1. Vepřový řízek, bramborový salát\n2. Domácí vafle s borůvkovým přelivem",
        allergens: "1,7 / 1,3,7,9,10 / 1,3,7",
      },
      {
        day: "Čtvrtek",
        soup: "Polévka uzená s rýží",
        main: "Plněná vepřová roláda a) rýže b) brambor",
        allergens: "9",
      },
      {
        day: "Pátek",
        soup: "Polévka kyselka",
        main: "Hovězí kostky na paprice a) těstoviny b) houskový knedlík",
        allergens: "1,3,7 / 1,3,7",
      },
    ],
  }

  // Data pro týden 2 (21. týden)
  const week2Data = {
    weekNumber: "21. týden",
    dateRange: "od: 19.5.2025    do: 23.5.2025",
    days: [
      {
        day: "Pondělí",
        soup: "Polévka hrachová s párkem",
        main: "Špecle s čínskou zeleninou",
        allergens: "1,3,7,9 / 1,3,7,9",
      },
      {
        day: "Úterý",
        soup: "Polévka česnečka s krutony",
        main: "Rybí filé (120 g), brambor, tatarská omáčka",
        allergens: "1,3,7,9 / 1,3,4,7,10",
      },
      {
        day: "Středa",
        soup: "Polévka vývar s drobením",
        main: "1. Rajská omáčka s masovými kuličkami a) těstoviny b) houskový knedlík\n2. Těstoviny s brokolicí a smetanovou omáčkou",
        allergens: "1,3,7,9 / 1,3,7 / 1,3,7",
      },
      {
        day: "Čtvrtek",
        soup: "Polévka hovězí vývar s játrovou zavářkou",
        main: "Uzená krkovice, bramborová kaše, kys.okurka",
        allergens: "1,3,7 / 7",
      },
      {
        day: "Pátek",
        soup: "Polévka slepičí s rýží",
        main: "Segedínský guláš a) těstoviny b) houskový knedlík",
        allergens: "9 / 1,3,7",
      },
    ],
  }

  const data = week === "week1" ? week1Data : week2Data

  // Generate HTML content for the menu
  let tableRows = ""
  data.days.forEach((day) => {
    tableRows += `
      <tr>
        <td class="day-cell">${day.day}</td>
        <td class="menu-cell">
          <div class="soup">${day.soup}</div>
          <div class="main-dish">${day.main.replace(/\n/g, "<br>")}</div>
        </td>
        <td class="allergen-cell">${day.allergens}</td>
      </tr>
    `
  })

  const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jídelní lístek - ${data.weekNumber}</title>
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }
        @media print {
            body { 
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .container {
                max-width: none;
                margin: 0;
                padding: 10mm;
            }
        }
        body { 
            font-family: Arial, sans-serif; 
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            background: white;
            max-width: 800px;
            margin: 0 auto;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #333;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .company-info {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .company-address {
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
        }
        .menu-title {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0 10px 0;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .week-info {
            font-size: 16px;
            margin-bottom: 25px;
            color: #666;
            font-weight: bold;
        }
        .menu-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .menu-table th {
            border: 2px solid #333;
            padding: 12px;
            background-color: #333;
            color: white;
            font-weight: bold;
            text-align: center;
            font-size: 14px;
        }
        .menu-table td {
            border: 1px solid #ddd;
            padding: 12px;
            vertical-align: top;
        }
        .menu-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .day-cell {
            font-weight: bold;
            width: 15%;
            text-align: center;
            background-color: #f0f0f0 !important;
            color: #333;
            font-size: 14px;
        }
        .menu-cell {
            width: 70%;
            padding: 15px;
        }
        .allergen-cell {
            width: 15%;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            color: #666;
        }
        .soup {
            font-style: italic;
            margin-bottom: 10px;
            color: #666;
            font-size: 13px;
        }
        .main-dish {
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
        }
        .note {
            margin-top: 25px;
            font-size: 11px;
            border-top: 2px solid #333;
            padding-top: 15px;
            text-align: center;
            color: #666;
        }
        .note p {
            margin: 5px 0;
        }
        .footer-logo {
            text-align: center;
            margin-top: 20px;
            color: #333;
            font-weight: bold;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="company-info">Zemědělské obchodní družstvo Borovany</div>
            <div class="company-address">Borovany 123, 373 12 Borovany</div>
            <div class="menu-title">Jídelní lístek</div>
            <div class="week-info">${data.weekNumber} (${data.dateRange})</div>
        </div>
        
        <table class="menu-table">
            <thead>
                <tr>
                    <th>Den</th>
                    <th>Menu</th>
                    <th>Alergeny</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        
        <div class="note">
            <p><strong>Změna jídelníčku vyhrazena.</strong></p>
            <p>Dobrou chuť přeje kolektiv kuchyně ZOD Borovany!</p>
            <p><strong>Alergeny:</strong> 1-obiloviny obsahující lepek, 3-vejce, 4-ryby, 7-mléko, 9-celer, 10-hořčice</p>
        </div>
        
        <div class="footer-logo">
            🌾 ZOD Borovany 🌾
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
