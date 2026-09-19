import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://v0-dumb-charades.vercel.app"),
  title: {
    default: "Dumb Charades Movie Generator - 500+ Bollywood, Hollywood & Tollywood Movies",
    template: "%s | Dumb Charades Movie Generator",
  },
  description:
    "Free online Dumb Charades movie generator and party timer with 500+ actable Bollywood (Hindi), Hollywood, Tollywood, Kollywood, Korean, and Japanese movies. Built-in word counts, team scoreboard, and no-repeat history.",
  keywords: [
    "dumb charades",
    "bollywood dumb charades",
    "dumb charades movies",
    "hindi movies for dumb charades",
    "bollywood movie generator",
    "dumb charades online timer",
    "hollywood dumb charades",
    "tollywood dumb charades",
    "kollywood dumb charades",
    "party game movie generator",
    "actable bollywood movies",
  ],
  authors: [{ name: "Ayush Goyal", url: "https://github.com/ayush987goyal" }],
  creator: "Ayush Goyal",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://v0-dumb-charades.vercel.app",
    siteName: "Dumb Charades Movie Generator",
    title: "Dumb Charades Movie Generator - 500+ Bollywood & Global Movies",
    description:
      "Play Dumb Charades with 500+ hand-picked actable Bollywood, Hollywood, Tollywood, and Kollywood movies. Includes word counts, round timer, and team scores.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Dumb Charades Movie Generator",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Dumb Charades Movie Generator - 500+ Bollywood & Global Movies",
    description:
      "Free online Dumb Charades movie generator with 500+ actable Bollywood, Hollywood, Tollywood & Kollywood movies, word count badges, and round timer.",
    images: ["/web-app-manifest-512x512.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon1.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon1.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon0.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dumb Charades Movie Generator",
  url: "https://v0-dumb-charades.vercel.app",
  applicationCategory: "GameApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online Dumb Charades movie generator and party timer featuring 500+ actable Bollywood (Hindi), Hollywood, Tollywood, Kollywood, British, French, Korean, and Japanese movies with word counts and team scoring.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
