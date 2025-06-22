"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Upload, FileText } from "lucide-react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [currentMenus, setCurrentMenus] = useState({
    week1Url: "",
    week2Url: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentMenus()
    }
  }, [isAuthenticated])

  const loadCurrentMenus = () => {
    setLoading(true)
    fetch("/api/menu/update")
      .then((res) => res.json())
      .then((data) => {
        setCurrentMenus({
          week1Url: data.week1Url || "",
          week2Url: data.week2Url || "",
        })
      })
      .catch((error) => {
        console.error("Error fetching menus:", error)
        setMessage("Chyba při načítání aktuálních jídelních lístků")
      })
      .finally(() => setLoading(false))
  }

  const handleLogin = () => {
    if (password === "iveta") {
      setIsAuthenticated(true)
      setMessage("")
    } else {
      setMessage("Nesprávné heslo")
    }
  }

  const handleFileUpload = async (file: File, week: "week1" | "week2") => {
    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("week", week)

    try {
      const response = await fetch("/api/admin/upload-menu", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Update the menu URL
        const updateResponse = await fetch("/api/menu/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            week: week,
            url: data.url,
          }),
        })

        if (updateResponse.ok) {
          setMessage(`${week === "week1" ? "Týden 1" : "Týden 2"} byl úspěšně nahrán`)

          // Reload current menus
          loadCurrentMenus()
        } else {
          setMessage(`Soubor byl nahrán, ale došlo k chybě při aktualizaci`)
        }
      } else {
        setMessage(data.error || "Chyba při nahrávání souboru")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setMessage("Chyba při nahrávání souboru")
    } finally {
      setUploading(false)
    }
  }

  const handleDocumentUpload = async (file: File, documentType: string) => {
    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("documentType", documentType)

    try {
      const response = await fetch("/api/admin/upload-document", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`${documentType} byl úspěšně nahrán`)
      } else {
        setMessage(data.error || "Chyba při nahrávání souboru")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setMessage("Chyba při nahrávání souboru")
    } finally {
      setUploading(false)
    }
  }

  const isDefaultUrl = (url: string) => {
    return url.includes("/api/menu/default/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">🔐 Administrace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Zadejte heslo..."
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Přihlásit se
            </Button>
            {message && (
              <Alert variant={message.includes("Chyba") ? "destructive" : "default"}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">📋 Správa jídelních lístků</h1>
          <p className="text-gray-600">Nahrajte PDF soubory pro týdenní jídelní lístky</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Week 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Týden 1
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "week1")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <p className="text-sm font-medium text-gray-700">Aktuální stav:</p>
                {isDefaultUrl(currentMenus.week1Url) ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Žádný PDF soubor není nahrán
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    PDF soubor je nahrán
                    <a
                      href={currentMenus.week1Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      Zobrazit
                    </a>
                  </div>
                )}
              </CardFooter>
            </Card>

            {/* Week 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Týden 2
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "week2")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <p className="text-sm font-medium text-gray-700">Aktuální stav:</p>
                {isDefaultUrl(currentMenus.week2Url) ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Žádný PDF soubor není nahrán
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    PDF soubor je nahrán
                    <a
                      href={currentMenus.week2Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      Zobrazit
                    </a>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Ostatní dokumenty */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">📄 Ostatní dokumenty</h2>
          <p className="text-center text-gray-600 mb-8">Nahrajte PDF soubory pro aktuality, VOS a dokumenty</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aktuality */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Aktuality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "aktuality")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>

            {/* VOS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  VOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "vos")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>

            {/* Stanovy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Stanovy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "stanovy")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>

            {/* Dotace */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Dotace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleDocumentUpload(file, "dotace")
                    }}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">Pouze PDF soubory</p>
                </div>
                {uploading && <LoadingSpinner />}
              </CardContent>
            </Card>
          </div>
        </div>

        {message && (
          <Alert className="mt-6" variant={message.includes("Chyba") ? "destructive" : "default"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8 text-center">
          <Button onClick={() => (window.location.href = "/")} variant="outline" className="mr-4">
            ← Zpět na hlavní stránku
          </Button>
          <Button onClick={() => (window.location.href = "/jidelni-listek")} variant="outline">
            Zobrazit jídelní lístky
          </Button>
        </div>
      </div>
    </div>
  )
}
