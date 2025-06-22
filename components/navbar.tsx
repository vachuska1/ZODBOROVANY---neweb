"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileMenu } from "./mobile-menu"

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  const flagImages = {
    cs: "/images/flags/czech-republic.png",
    en: "/images/flags/united-kingdom.png",
    de: "/images/flags/germany.png",
  }

  const flagLabels = {
    cs: "Čeština",
    en: "English",
    de: "Deutsch",
  }

  // Funkce pro určení, zda je odkaz aktivní
  const isActive = (path: string) => {
    return pathname === path
  }

  // Navigační odkazy
  const navLinks = [
    { href: "/", label: "home" },
    { href: "/aktuality", label: "news" },
    { href: "/jidelni-listek", label: "menu" },
    { href: "/vos", label: "vos" },
    { href: "/stanovy", label: "statutes" },
    { href: "/dotacni-tituly", label: "grants" },
    { href: "/kontakt", label: "contact" },
  ]

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="ZOD Borovany Logo"
                width={60}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-lg font-medium transition-colors relative ${
                    isActive(link.href)
                      ? "text-black font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher with Flags */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Image
                    src={flagImages[language] || "/placeholder.svg"}
                    alt={flagLabels[language]}
                    width={24}
                    height={16}
                    className="rounded-sm"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("cs")} className="flex items-center gap-2">
                  <Image
                    src="/images/flags/czech-republic.png"
                    alt="Čeština"
                    width={20}
                    height={13}
                    className="rounded-sm"
                  />
                  Čeština
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className="flex items-center gap-2">
                  <Image
                    src="/images/flags/united-kingdom.png"
                    alt="English"
                    width={20}
                    height={13}
                    className="rounded-sm"
                  />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("de")} className="flex items-center gap-2">
                  <Image src="/images/flags/germany.png" alt="Deutsch" width={20} height={13} className="rounded-sm" />
                  Deutsch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
