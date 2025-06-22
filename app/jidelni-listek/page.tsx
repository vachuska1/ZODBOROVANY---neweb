"use client"

import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Printer } from "lucide-react"

export default function MenuPage() {
  const { t } = useLanguage()
  const [pdfUrls, setPdfUrls] = useState({
    week1: "/api/menu/default/week1",
    week2: "/api/menu/default/week2",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [showDefaultMenu, setShowDefaultMenu] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // Try to reload when coming back online
      if (showDefaultMenu) {
        window.location.reload()
      }
    }
    const handleOffline = () => {
      setIsOnline(false)
      setShowDefaultMenu(true)
      setError("Nejste připojeni k internetu. Zobrazuji poslední dostupnou verzi.")
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    const fetchMenu = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/menu/update")
        
        if (!response.ok) throw new Error('Network response was not ok')
        
        const data = await response.json()
        setPdfUrls({
          week1: data.week1Url || "/api/menu/default/week1",
          week2: data.week2Url || "/api/menu/default/week2",
        })
        setError("")
        setShowDefaultMenu(false)
      } catch (err) {
        console.error("Error fetching menu:", err)
        setPdfUrls({
          week1: "/api/menu/default/week1",
          week2: "/api/menu/default/week2",
        })
        setError("Nepodařilo se načíst jídelní lístek. Zobrazuji poslední dostupnou verzi.")
        setShowDefaultMenu(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMenu()
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handlePrint = (weekUrl: string, weekTitle: string) => {
    const printWindow = window.open(weekUrl, "_blank", "width=800,height=600")
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 1000)
      }
    }
  }

  // Function to create PDF.js URL
  const getPdfJsUrl = (pdfUrl: string) => {
    // Check if the URL is already absolute
    const isAbsoluteUrl = /^https?:\/\//i.test(pdfUrl)
    const fullUrl = isAbsoluteUrl ? pdfUrl : `${window.location.origin}${pdfUrl}`
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fullUrl)}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("menu")}</h1>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}
        
        {!loading && error && (
          <Alert variant="default" className="mb-6 bg-yellow-50 border-yellow-200 text-yellow-800">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tento týden */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{t("thisWeek")}</h2>
                  <Button
                    onClick={() => handlePrint(pdfUrls.week1, t("thisWeek"))}
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    {t("print")}
                  </Button>
                </div>
              </div>
              <div className="h-[700px]">
                <iframe
                  src={getPdfJsUrl(pdfUrls.week1)}
                  className="w-full h-full border-0"
                  title={`${t("menu")} - ${t("thisWeek")}`}
                  onError={() => setError("Chyba při načítání jídelního lístku")}
                />
              </div>
            </div>

            {/* Příští týden */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-700 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{t("nextWeek")}</h2>
                  <Button
                    onClick={() => handlePrint(pdfUrls.week2, t("nextWeek"))}
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    {t("print")}
                  </Button>
                </div>
              </div>
              <div className="h-[700px]">
                <iframe
                  src={getPdfJsUrl(pdfUrls.week2)}
                  className="w-full h-full border-0"
                  title={`${t("menu")} - ${t("nextWeek")}`}
                  onError={() => setError("Chyba při načítání jídelního lístku")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
