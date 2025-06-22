"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer } from "lucide-react"

export default function VOSPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")
  const [pdfUrl, setPdfUrl] = useState("/api/pdfs/vos")

  useEffect(() => {
    fetch("/api/documents/get-url?type=vos")
      .then((res) => res.json())
      .then((data) => {
        setPdfUrl(data.url || "/api/pdfs/vos")
      })
      .catch(() => {
        setPdfUrl("/api/pdfs/vos")
      })
  }, [])

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, "_blank", "width=800,height=600")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 1000)
      }
    }
  }

  // Funkce pro vytvoření PDF.js URL - STEJNĚ JAKO U JÍDELNÍCH LÍSTKŮ
  const getPdfJsUrl = (pdfUrl: string) => {
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{t("internalReporting")}</h1>
        </div>

        {error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white p-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {t("vos")} - {t("internalReporting")}
                  </h2>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    {t("print")}
                  </Button>
                </div>
              </div>
              <div className="h-[calc(200vh-150px)] w-full">
                <iframe
                  src={getPdfJsUrl(pdfUrl)}
                  className="w-full h-full border-0"
                  title={t("internalReporting")}
                  onError={() => setError("Chyba při načítání dokumentu")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
