import { NextResponse } from "next/server"

export async function GET() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dotační tituly - ZOD Borovany</title>
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
        }
        body { 
            font-family: Arial, sans-serif; 
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
            padding: 15px;
            background: white;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #003d82;
            padding-bottom: 20px;
        }
        .eu-header {
            background: linear-gradient(to right, #003d82, #ffcc00);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .project-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        .eu-logos {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        .logo-box {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin: 10px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            min-width: 200px;
        }
        .logo-text {
            font-weight: bold;
            color: #003d82;
            font-size: 12px;
            margin-top: 10px;
        }
        .project-section {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 5px solid #003d82;
        }
        .project-section h3 {
            color: #003d82;
            margin-top: 0;
            font-size: 18px;
        }
        .project-description {
            text-align: justify;
            margin: 15px 0;
            font-size: 16px;
            line-height: 1.6;
        }
        .benefits-list {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .benefits-list ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .benefits-list li {
            margin: 8px 0;
            font-size: 15px;
        }
        .location-info {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 5px solid #16a34a;
        }
        .footer-eu {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #003d82;
            color: white;
            border-radius: 8px;
        }
        .website-link {
            font-size: 12px;
            color: #ffcc00;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="eu-header">
        <div class="project-title">PROJEKT</div>
        <div style="font-size: 20px; font-weight: bold;">MODERNIZACE CHOVU DRŮBEŽE</div>
        <div style="font-size: 16px; margin-top: 10px;">je spolufinancován Evropskou unií</div>
    </div>

    <div class="project-section">
        <h3>🎯 Hlavní cíl projektu</h3>
        <div class="project-description">
            Hlavním cílem je investice vedoucí k modernizaci zemědělského podniku. Projekt přispěje ke zvýšení efektivity chovu drůbeže a zlepšení podmínek pro zvířata.
        </div>
    </div>

    <div class="eu-logos">
        <div class="logo-box">
            <div style="font-size: 24px; color: #003d82;">🇪🇺</div>
            <div class="logo-text">EVROPSKÁ UNIE<br>Evropský zemědělský fond pro rozvoj venkova</div>
            <div style="color: #ffcc00; font-weight: bold; margin-top: 5px;">Evropa investuje do venkovských oblastí</div>
        </div>
        
        <div class="logo-box">
            <div style="font-size: 24px; color: #16a34a;">🌾</div>
            <div class="logo-text">MINISTERSTVO ZEMĚDĚLSTVÍ<br>Program rozvoje venkova</div>
        </div>
    </div>

    <div class="project-section">
        <h3>📋 Další projekty ZOD Borovany</h3>
        
        <div class="benefits-list">
            <h4>🔧 Výměna chladící technologie a separátoru</h4>
            <p>Projektem dojde prostřednictvím výměny technologie využívané na chlazení mléka a k separaci kejdy ke snížení ekologické stopy a energetické náročnosti provozu podniku žadatele.</p>
            
            <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <strong>Přínosy projektu:</strong>
                <ul>
                    <li>Snížení emisí hlavních znečišťujících látek do ovzduší</li>
                    <li>Úspora energií při provozu</li>
                    <li>Modernizace technologického vybavení</li>
                    <li>Zlepšení ekologické stopy podniku</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="location-info">
        <h3>📍 Místo realizace</h3>
        <p><strong>Projekt je realizován v katastrálním území Borovany.</strong></p>
        <p>Adresa: Vodárenská 97, 373 12 Borovany</p>
    </div>

    <div class="eu-logos">
        <div class="logo-box">
            <div style="font-size: 20px; color: #003d82;">💼</div>
            <div class="logo-text">MINISTERSTVO<br>PRŮMYSLU A OBCHODU</div>
        </div>
        
        <div class="logo-box">
            <div style="font-size: 20px; color: #ffcc00;">⭐</div>
            <div class="logo-text">Financováno<br>Evropskou unií<br>NextGenerationEU</div>
        </div>
        
        <div class="logo-box">
            <div style="font-size: 20px; color: #16a34a;">🔄</div>
            <div class="logo-text">Národní<br>plán<br>obnovy</div>
        </div>
    </div>

    <div class="footer-eu">
        <div style="font-size: 18px; font-weight: bold;">Spolufinancováno Evropskou unií</div>
        <div class="website-link">Více projektů podpořených Evropskou unií na www.mapaprojektu.cz</div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ffcc00;">
            <strong>ZOD BOROVANY</strong><br>
            Moderní zemědělské družstvo s tradicí
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
