"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Facebook } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation - Left aligned on desktop, center on mobile */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">{t("navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/aktuality" className="hover:text-green-400 transition-colors">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link href="/jidelni-listek" className="hover:text-green-400 transition-colors">
                  {t("menu")}
                </Link>
              </li>
              <li>
                <Link href="/vos" className="hover:text-green-400 transition-colors">
                  {t("vos")}
                </Link>
              </li>
              <li>
                <Link href="/stanovy" className="hover:text-green-400 transition-colors">
                  {t("statutes")}
                </Link>
              </li>
              <li>
                <Link href="/dotacni-tituly" className="hover:text-green-400 transition-colors">
                  {t("grants")}
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-green-400 transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Center aligned */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <div className="space-y-2 text-sm">
              <p>Zemědělské obchodní družstvo Borovany</p>
              <p>Vodárenská 97</p>
              <p>373 12 Borovany</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@zodborovany.cz"
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  info@zodborovany.cz
                </a>
              </p>
              <p>
                Tel:{" "}
                <a href="tel:387023511" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                  387 023 511
                </a>
              </p>
            </div>
          </div>

          {/* Follow Us - Right aligned on desktop, center on mobile */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">{t("followUs")}</h3>
            <div className="flex justify-center md:justify-end">
              <a
                href="https://www.facebook.com/zodborovany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Zemědělské obchodní družstvo Borovany. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}
