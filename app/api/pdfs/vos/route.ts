import { NextResponse } from "next/server"

export async function GET() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vnitřní oznamovací systém - ZOD Borovany</title>
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
            font-size: 12px;
            line-height: 1.5;
            margin: 0;
            padding: 15px;
            background: white;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #16a34a;
            padding-bottom: 15px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #16a34a;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
        .section {
            margin: 20px 0;
            padding: 15px;
            border-left: 4px solid #16a34a;
            background: #f9f9f9;
        }
        .section h3 {
            color: #16a34a;
            margin-top: 0;
            font-size: 16px;
            font-weight: bold;
        }
        .section p {
            margin: 10px 0;
            text-align: justify;
        }
        .contact-box {
            background: #16a34a;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .contact-box h3 {
            margin-top: 0;
            color: white;
        }
        .methods {
            background: #f0f9ff;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .methods h4 {
            color: #16a34a;
            margin-top: 0;
        }
        .methods ol {
            margin: 10px 0;
            padding-left: 20px;
        }
        .methods li {
            margin: 8px 0;
        }
        .important {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #16a34a;
            color: #666;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Vnitřní oznamovací systém</div>
        <div class="subtitle">V souladu se zákonem č. 171/2023 Sb., o ochraně oznamovatelů</div>
    </div>

    <div class="section">
        <h3>📋 Účel systému</h3>
        <p>Zemědělské obchodní družstvo Borovany zavedlo vnitřní oznamovací systém k podávání, vyřizování a prošetřování oznámení, na které se citovaný právní předpis vztahuje.</p>
        <p>Vnitřní oznamovací systém je určen pouze fyzickým osobám, tj. oznamovatelům, kteří podali oznámení obsahující informace o možném protiprávním jednání, které získali v souvislosti se svou prací nebo jinou obdobnou činností vykonávanou pro ZOD Borovany.</p>
    </div>

    <div class="section">
        <h3>⚖️ Definice oznámení</h3>
        <p>Oznámením se rozumí podání, které obsahuje informace o možném protiprávním jednání, jak jsou tato definována v §2 odst. 1 zákona č. 171/2023, k němuž došlo nebo má dojít u osoby, pro níž oznamovatel, byť zprostředkovaně, vykonával nebo vykonává práci nebo jinou obdobnou činnost.</p>
        
        <div class="important">
            <strong>Důležité požadavky na oznámení:</strong>
            <ul>
                <li>Oznámení musí být srozumitelné a určité</li>
                <li>Musí být zřejmé, jakého jednání se týká</li>
                <li>Musí obsahovat údaje o jménu, příjmení a datu narození oznamovatele</li>
                <li>Oznamovatel má jednat ve veřejném zájmu a v dobré víře</li>
            </ul>
        </div>
    </div>

    <div class="contact-box">
        <h3>👤 Příslušná osoba k přijímání oznámení</h3>
        <p><strong>Ing. Iveta Schacherlová</strong></p>
        <p>📧 Email: oznameni@zodborovany.cz</p>
        <p>📞 Tel: 778 411 334</p>
        <p>📍 Adresa: Vodárenská 97, 373 12 Borovany</p>
    </div>

    <div class="methods">
        <h4>📝 Způsoby podání oznámení</h4>
        <ol>
            <li><strong>V elektronické podobě</strong><br>
                Výhradně na emailovou adresu: <strong>oznamovatel@zodborovany.cz</strong></li>
            
            <li><strong>V listinné podobě</strong><br>
                Na adresu sídla družstva<br>
                <em>Poznámka: Oznámení musí být doručeno v zalepené obálce s označením "OZNÁMENÍ – NEOTVÍRAT"</em></li>
            
            <li><strong>Telefonicky</strong><br>
                V pracovní dny od 8:00 – 15:00 hod.</li>
            
            <li><strong>Osobně</strong><br>
                Po telefonické domluvě s příslušnou osobou</li>
        </ol>
    </div>

    <div class="section">
        <h3>🎙️ Ústní oznámení</h3>
        <p>O ústním oznámení se souhlasem oznamovatele a v souladu s ustanovením § 19 zák. č. 171/2023 vyhotoví příslušná osoba zvukovou nahrávku nebo záznam, který věrně zachycuje podstatu oznámení.</p>
    </div>

    <div class="section">
        <h3>🏛️ Oznamovací systém Ministerstva spravedlnosti</h3>
        <p>Oznámení je možné také podat prostřednictvím Ministerstva spravedlnosti ČR. Bližší informace na webových stránkách ministerstva.</p>
    </div>

    <div class="footer">
        <p><strong>ZOD Borovany</strong> - Zemědělské obchodní družstvo</p>
        <p>Vodárenská 97, 373 12 Borovany | www.zodborovany.cz</p>
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
