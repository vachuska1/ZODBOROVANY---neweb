import { NextResponse } from "next/server"

export async function GET() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stanovy - ZOD Borovany</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
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
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 15px;
            background: white;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #16a34a;
            padding-bottom: 20px;
        }
        .title {
            font-size: 32px;
            font-weight: bold;
            color: #16a34a;
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        .company-info {
            font-size: 14px;
            color: #666;
            margin: 10px 0;
        }
        .section {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #16a34a;
            margin: 20px 0 10px 0;
            border-bottom: 2px solid #16a34a;
            padding-bottom: 5px;
        }
        .article {
            margin: 15px 0;
            padding: 10px;
            background: #f9f9f9;
            border-left: 4px solid #16a34a;
        }
        .article-number {
            font-weight: bold;
            color: #16a34a;
            font-size: 14px;
        }
        .subsection {
            margin: 10px 0 10px 20px;
        }
        .list-item {
            margin: 5px 0 5px 15px;
        }
        .important {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .footer-signature {
            margin-top: 50px;
            text-align: center;
            border-top: 2px solid #16a34a;
            padding-top: 20px;
        }
        .signature-line {
            margin: 30px 0;
            text-align: center;
        }
        .signature-line::after {
            content: "";
            display: block;
            width: 200px;
            height: 1px;
            background: #333;
            margin: 10px auto;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">STANOVY</div>
        <div class="company-info">Zemědělské obchodní družstvo Borovany</div>
        <div class="company-info">Borovany 373 12</div>
        <div class="company-info">www.zodborovany.cz</div>
    </div>

    <div class="section">
        <div class="section-title">I. ZÁKLADNÍ USTANOVENÍ</div>
        
        <div class="article">
            <div class="article-number">Článek 1 - Název a sídlo</div>
            <div class="subsection">
                <p>1. Název družstva: <strong>Zemědělské obchodní družstvo Borovany</strong></p>
                <p>2. Sídlo družstva: <strong>Vodárenská 97, 373 12 Borovany</strong></p>
                <p>3. Družstvo je právnickou osobou podle zákona č. 252/1997 Sb., o zemědělském družstevnictví</p>
            </div>
        </div>

        <div class="article">
            <div class="article-number">Článek 2 - Předmět činnosti</div>
            <div class="subsection">
                <p>Družstvo se zabývá:</p>
                <div class="list-item">a) rostlinnou výrobou</div>
                <div class="list-item">b) živočišnou výrobou</div>
                <div class="list-item">c) výrobou a zpracováním zemědělských produktů</div>
                <div class="list-item">d) poskytováním služeb v zemědělství</div>
                <div class="list-item">e) provozováním závodní kuchyně</div>
                <div class="list-item">f) velkoobchodem a maloobchodem</div>
                <div class="list-item">g) dopravními službami</div>
                <div class="list-item">h) údržbou a opravami zemědělské techniky</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">II. ČLENSTVÍ</div>
        
        <div class="article">
            <div class="article-number">Článek 3 - Vznik členství</div>
            <div class="subsection">
                <p>1. Členství vzniká na základě písemné přihlášky a jejího schválení představenstvem</p>
                <p>2. Členem se může stát fyzická nebo právnická osoba, která souhlasí se stanovami</p>
                <p>3. Člen je povinen složit členský vklad ve výši 10.000,- Kč</p>
            </div>
        </div>

        <div class="article">
            <div class="article-number">Článek 4 - Práva a povinnosti členů</div>
            <div class="subsection">
                <p><strong>Člen má právo:</strong></p>
                <div class="list-item">a) účastnit se členské schůze s hlasovacím právem</div>
                <div class="list-item">b) volit a být volen do orgánů družstva</div>
                <div class="list-item">c) kontrolovat činnost družstva</div>
                <div class="list-item">d) podílet se na zisku družstva</div>
                
                <p style="margin-top: 15px;"><strong>Člen je povinen:</strong></p>
                <div class="list-item">a) dodržovat stanovy a usnesení orgánů družstva</div>
                <div class="list-item">b) platit členské příspěvky</div>
                <div class="list-item">c) nepoškozovat zájmy družstva</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">III. ORGÁNY DRUŽSTVA</div>
        
        <div class="article">
            <div class="article-number">Článek 5 - Členská schůze</div>
            <div class="subsection">
                <p>1. Členská schůze je nejvyšším orgánem družstva</p>
                <p>2. Rozhoduje o základních otázkách činnosti družstva</p>
                <p>3. Koná se nejméně jednou ročně</p>
            </div>
        </div>

        <div class="article">
            <div class="article-number">Článek 6 - Představenstvo</div>
            <div class="subsection">
                <p>1. Představenstvo je statutárním orgánem družstva</p>
                <p>2. Má 5 členů volených členskou schůzí na 4 roky</p>
                <p>3. Řídí činnost družstva mezi zasedáními členské schůze</p>
            </div>
        </div>

        <div class="article">
            <div class="article-number">Článek 7 - Kontrolní komise</div>
            <div class="subsection">
                <p>1. Kontrolní komise má 3 členy</p>
                <p>2. Kontroluje hospodaření a dodržování stanov</p>
                <p>3. Podává zprávy členské schůzi</p>
            </div>
        </div>
    </div>

    <div class="important">
        <strong>Důležité:</strong> Tyto stanovy byly schváleny členskou schůzí dne 28. listopadu 2014 s účinností od 21.6.2024
    </div>

    <div class="footer-signature">
        <div class="signature-line">
            <strong>za ZOD Borovany</strong><br><br>
            <strong>Ing. Jan Kouba</strong><br>
            předseda představenstva
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
