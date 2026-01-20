import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-persian",
})

export const metadata: Metadata = {
  title: "Persian Learning - Master Farsi from Beginner to Fluent",
  description:
    "Learn Persian (Farsi) through 90 comprehensive modules covering vocabulary, grammar, reading, writing, and conversation from beginner to advanced level.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
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
      <body className={`font-sans antialiased ${vazir.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
