import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dumb Charades - Party Game",
  description: "Play dumb charades with your friends! Act out movies and score points.",
  generator: "v0.app",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
