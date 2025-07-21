import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppWidget from "@/components/WhatsAppWidget"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "IT Solutions Company in Pune | AI, IoT & Cloud Services - CanoSolutions",
  description:
    "Government grant winner CanoSolutions offers cutting-edge AI, IoT, Cloud Computing & Smart Systems solutions. Transform your business with our innovative IT services in Pune & Maharashtra.",
  keywords:
    "IT solutions Pune, AI services, IoT solutions, Cloud computing, Smart systems, Government IT partner, Digital transformation Maharashtra",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-helvetica`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
