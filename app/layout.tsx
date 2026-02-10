import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist, Geist_Mono, Vazirmatn } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { BottomNav } from "@/components/bottom-nav"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-persian",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Persian Learning - Master Farsi from Beginner to Fluent",
  description:
    "Learn Persian (Farsi) through 90 comprehensive modules covering vocabulary, grammar, reading, writing, and conversation from beginner to advanced level.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Persian Learning",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
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
      <body className={`font-sans antialiased ${inter.variable} ${vazir.variable} pb-[env(safe-area-inset-bottom)]`}>
        <AuthProvider>
          {children}
          <BottomNav />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
