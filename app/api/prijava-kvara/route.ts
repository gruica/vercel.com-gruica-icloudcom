import { NextResponse } from "next/server"
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email"
import { sendSMS } from "@/lib/sms"

export async function POST(request: Request) {
  try {
    console.log("API ruta: Primljen zahtev za prijavu kvara")

    // Provera environment varijabli
    console.log("API ruta: Provera environment varijabli")
    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "postoji" : "ne postoji")
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "postoji" : "ne postoji")
    console.log("NOTIFICATION_EMAIL:", process.env.NOTIFICATION_EMAIL ? "postoji" : "ne postoji")

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFICATION_EMAIL) {
      throw new Error("Nedostaju email kredencijali u konfiguraciji")
    }

    const formData = await request.json()
    console.log("API ruta: Primljeni podaci forme:", JSON.stringify(formData, null, 2))

    // Validacija obaveznih polja
    const requiredFields = ["ime", "telefon", "email", "adresa", "grad", "tipUredjaja", "opisKvara"]
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw new Error(`Nedostaje obavezno polje: ${field}`)
      }
    }

    // Generisanje jedinstvenog ID-a za prijavu
    const serviceId = generateServiceId()
    formData.serviceId = serviceId

    // Slanje email obaveštenja servisu
    console.log("API ruta: Pokušaj slanja email obaveštenja servisu")
    const emailInfo = await sendNotificationEmail(formData)
    console.log("API ruta: Email uspešno poslat servisu:", emailInfo)

    // Slanje email potvrde korisniku
    console.log("API ruta: Pokušaj slanja email potvrde korisniku")
    const confirmationEmailInfo = await sendConfirmationEmail(formData, serviceId)
    console.log("API ruta: Email potvrda uspešno poslata korisniku:", confirmationEmailInfo)

    // Slanje SMS potvrde
    console.log("API ruta: Pokušaj slanja SMS potvrde")
    const smsInfo = await sendSMS(
      formData.telefon,
      `Poštovani/a ${formData.ime}, vaša prijava kvara #${serviceId} je uspješno primljena. Kontaktiraćemo vas uskoro. Frigo Sistem Todosijevic`,
    )
    console.log("API ruta: SMS uspešno poslat:", smsInfo)

    return NextResponse.json({
      success: true,
      message: "Prijava uspešno poslata",
      serviceId: serviceId,
      emailSent: true,
    })
  } catch (error) {
    console.error("API ruta: Greška:", error)

    let errorMessage = "Došlo je do greške prilikom slanja prijave."
    let errorDetails = ""

    if (error instanceof Error) {
      console.error("Tip greške:", error.name)
      console.error("Poruka greške:", error.message)
      console.error("Stack trace:", error.stack)

      if (error.message.includes("Nedostaju email kredencijali")) {
        errorMessage = "Greška u konfiguraciji email servisa. Molimo kontaktirajte administratora."
        errorDetails = "EMAIL_CONFIG_MISSING"
      } else if (error.message.includes("Nedostaje obavezno polje")) {
        errorMessage = "Molimo popunite sva obavezna polja."
        errorDetails = "MISSING_REQUIRED_FIELDS"
      } else if (error.message.includes("authentication failed")) {
        errorMessage = "Greška pri autentifikaciji email servisa. Molimo kontaktirajte administratora."
        errorDetails = "AUTH_FAILED"
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 },
    )
  }
}

// Funkcija za generisanje jedinstvenog ID-a prijave
function generateServiceId(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")

  return `${year}${month}${day}-${random}`
}

