"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, User, MapPin } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gdprConsent: false,
  })
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage(t("messageSuccessfullySent"))
        setFormData({ name: "", email: "", phone: "", message: "", gdprConsent: false })
      } else {
        setMessage(t("errorSendingMessage"))
      }
    } catch (error) {
      setMessage(t("errorSendingMessage"))
    } finally {
      setSending(false)
    }
  }

  const contacts = [
    {
      position: t("chairmanBoard"),
      name: "Ing. Jan Kouba",
      phone: "736 670 519",
      email: "predseda@zodborovany.cz",
    },
    {
      position: t("viceChairmanBoard"),
      name: "Ing. Jindřich Kořínek",
      phone: "604 204 498",
      email: "korinek@zodborovany.cz",
    },
    {
      position: t("economist"),
      name: "Ing. Iveta Schacherlová",
      phone: "778 411 334",
      email: "ekonom@zodborovany.cz",
    },
    {
      position: t("chiefZootechnician"),
      name: "Ing. Ondřej Kubala",
      phone: "778 474 530",
      email: "zootechnik@zodborovany.cz",
    },
    {
      position: t("chiefMechanizer"),
      name: "Josef Čada",
      phone: "778 767 969",
      email: "mechanik@zodborovany.cz",
    },
    {
      position: t("landManagement"),
      name: "Ing. Aleš Vachuška",
      phone: "736 670 520",
      email: "pozemky@zodborovany.cz",
    },
    {
      position: t("kitchenManager"),
      name: "Jana Rojdlová",
      phone: "387 023 519, 778 955 601",
      email: "info@zodborovany.cz",
      multiplePhones: ["387 023 519", "778 955 601"],
    },
  ]

  // Format phone number for tel: links (remove spaces)
  const formatPhoneForLink = (phone: string) => {
    return phone.replace(/\s+/g, "")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("contacts")}</h1>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contacts.map((contact, index) => (
            <Card key={index} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{contact.position}</h3>

                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{contact.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {contact.multiplePhones ? (
                      <div className="flex flex-col">
                        {contact.multiplePhones.map((phone, phoneIndex) => (
                          <a
                            key={phoneIndex}
                            href={`tel:${formatPhoneForLink(phone)}`}
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        href={`tel:${formatPhoneForLink(contact.phone)}`}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">{t("writeToUs")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    {t("nameAndSurname")}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    {t("phone")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700">
                    {t("message")}
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="gdpr"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: checked as boolean })}
                    required
                  />
                  <Label htmlFor="gdpr" className="text-sm text-gray-600 leading-relaxed">
                    {t("gdprConsent")}{" "}
                    <Link
                      href="/ochrana-osobnich-udaju"
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                    >
                      {t("gdprLink")}
                    </Link>{" "}
                    {t("gdprPurpose")}
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={sending || !formData.gdprConsent}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3"
                >
                  {sending ? t("sendingMessage") : t("sendMessage")}
                </Button>
              </form>

              {message && (
                <Alert className="mt-4" variant={message.includes("Chyba") ? "destructive" : "default"}>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Map Section */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("whereToFindUs")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">ZOD Borovany</h3>
                  <p className="text-gray-600">Vodárenská 97</p>
                  <p className="text-gray-600">373 12 Borovany</p>
                </div>

                {/* Map with exact GPS coordinates */}
                <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2637.0246553380795!2d14.639967976888752!3d48.90458467823061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDU0JzE2LjUiTiAxNMKwMzgnMzEuOCJF!5e0!3m2!1scs!2scz!4v1716989654321!5m2!1scs!2scz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ZOD Borovany - Vodárenská 97"
                  />
                </div>

                <div className="text-center">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=48.90458467823061,14.642156666796721"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    {t("showLargerMap")}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
