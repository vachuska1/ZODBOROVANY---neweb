import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { StructuredData } from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = 'https://www.zodborovany.cz';

export const metadata: Metadata = {
  title: {
    default: 'ZOD Borovany - Zemědělské obchodní družstvo',
    template: '%s | ZOD Borovany',
  },
  description: 'Zemědělské obchodní družstvo Borovany - moderní zemědělská výroba, živočišná výroba a podniková jídelna. Jsme tradiční zemědělský podnik s dlouholetou historií.',
  keywords: ['zemědělství', 'Borovany', 'zemědělská výroba', 'živočišná výroba', 'zemědělské družstvo', 'jídlo', 'jižní Čechy'],
  generator: 'Next.js',
  applicationName: 'ZOD Borovany',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'cs-CZ': '/',
      'en-US': '/en',
      'de-DE': '/de',
    },
  },
  openGraph: {
    title: 'ZOD Borovany - Zemědělské obchodní družstvo',
    description: 'Moderní zemědělská výroba, živočišná výroba a podniková jídelna v srdci jižních Čech',
    url: SITE_URL,
    siteName: 'ZOD Borovany',
    locale: 'cs_CZ',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ZOD Borovany - Zemědělské obchodní družstvo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZOD Borovany - Zemědělské obchodní družstvo',
    description: 'Moderní zemědělská výroba, živočišná výroba a podniková jídelna',
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicon_io/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/images/favicon_io/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/images/favicon_io/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/images/favicon_io/site.webmanifest',
  // Verification for Google Search Console and others
  // Verification for Google Search Console and others
  // Uncomment and add your verification codes when needed
  /*
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
  */
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <StructuredData
          title="ZOD Borovany - Zemědělské obchodní družstvo"
          description="Moderní zemědělská výroba, živočišná výroba a podniková jídelna v srdci jižních Čech"
          url={SITE_URL}
          logoUrl={`${SITE_URL}/images/logo.png`}
          address={{
            street: "Vodárenská 97",
            city: "Borovany",
            postalCode: "373 12",
            region: "Jihočeský kraj",
            country: "CZ",
          }}
          contact={{
            phone: "+420 387 023 511",
            email: "info@zodborovany.cz",
          }}
          coordinates={{
            latitude: "48.8996",
            longitude: "14.6422",
          }}
          openingHours={[
            "Pondělí-Pátek 7:00-15:00",
          ]}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
