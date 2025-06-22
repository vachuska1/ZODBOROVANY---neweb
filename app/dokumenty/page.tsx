"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer } from "lucide-react"

export default function DocumentsPage() {
  const { t } = useLanguage()
  const [error, setError] = useState("")
  const [documentUrls, setDocumentUrls] = useState({
    stanovy: "/api/pdfs/stanovy",
    dotace: "/api/pdfs/dotace",
  })

  useEffect(() => {
    // Load stanovy URL
    fetch("/api/documents/get-url?type=stanovy")
      .then((res) => res.json())
      .then((data) => {
        setDocumentUrls((prev) => ({
          ...prev,
          stanovy: data.url || "/api/pdfs/stanovy",
        }))
      })
      .catch(() => {})

    // Load dotace URL
    fetch("/api/documents/get-url?type=dotace")
      .then((res) => res.json())
      .then((data) => {
        setDocumentUrls((prev) => ({
          ...prev,
          dotace: data.url || "/api/pdfs/dotace",
        }))
      })
      .catch(() => {})
  }, [])

  const documents = [
    {
      title: t("statutes"),
      url: documentUrls.stanovy,
      id: "statutes",
    },
    {
      title: t("grants"),
      url: documentUrls.dotace,
      id: "grants",
    },
  ]

  const handlePrint = (url: string, title: string) => {
    const printWindow = window.open(url, "_blank", "width=800,height=600")
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t("documents")}</h1>

        <div className="space-y-8">
          {documents.map((document) => (
            <div key={document.id} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-800 text-white p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{document.title}</h2>
                    <Button
                      onClick={() => handlePrint(document.url, document.title)}
                      variant="outline"
                      size="sm"
                      className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      {t("print")}
                    </Button>
                  </div>
                </div>
                {error ? (
                  <Alert variant="destructive" className="m-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="h-[800px]">
                    <iframe
                      src={getPdfJsUrl(document.url)}
                      className="w-full h-full border-0"
                      title={document.title}
                      onError={() => setError("Chyba při načítání dokumentu")}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
