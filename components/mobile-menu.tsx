"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useLanguage } from "./language-provider"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  // Funkce pro určení, zda je odkaz aktivní
  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    { href: "/", label: "home" },
    { href: "/jidelni-listek", label: "menu" },
    { href: "/aktuality", label: "news" },
    { href: "/vos", label: "vos" },
    { href: "/dokumenty", label: "documents" },
    { href: "/kontakt", label: "contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium py-2 ${
                isActive(item.href)
                  ? "text-black font-semibold border-l-4 border-black pl-4"
                  : "text-gray-700 hover:text-black transition-colors pl-4"
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
