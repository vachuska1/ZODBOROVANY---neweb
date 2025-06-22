import Head from "next/head"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
}

export function SEO({
  title = "ZOD Borovany - Zemědělské obchodní družstvo",
  description = "Moderní zemědělské družstvo s tradicí a vizí do budoucnosti. Jídelní lístky, aktuality a služby pro komunitu Borovany.",
  keywords = "zemědělství, družstvo, Borovany, jídelní lístek, aktuality, VOS",
  ogImage = "/og-image.jpg",
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}
