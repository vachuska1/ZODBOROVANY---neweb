import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Všechna pole jsou povinná" }, { status: 400 })
    }

    await resend.emails.send({
      from: "onboarding@resend.dev", // Toto je jediná adresa, která funguje bez vlastní domény
      to: "aless.vachuska@seznam.cz",
      subject: `Nová zpráva z webu ZOD Borovany od ${name}`,
      replyTo: email, // Tady nastavíme email odesílatele pro odpověď
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Nová zpráva z kontaktního formuláře</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Jméno:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || "Neuvedeno"}</p>
            <p><strong>Zpráva:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Tato zpráva byla odeslána z kontaktního formuláře na webu ZOD Borovany.
          </p>
          <p style="color: #6b7280; font-size: 12px;">
            Pro odpověď stačí kliknout na "Odpovědět" - email se odešle přímo na ${email}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, message: "Zpráva byla úspěšně odeslána" })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Chyba při odesílání zprávy" }, { status: 500 })
  }
}
