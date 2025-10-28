import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Poppins } from "next/font/google"
import "./globals.css"
import ConditionalLayout from "@/components/ConditionalLayout"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Cano Solutions",
  description:
    "Government grant winner Cano Solutions offers cutting-edge AI, IoT, Cloud Computing & Smart Systems solutions. Transform your business with our innovative IT services in Pune & Maharashtra.",
  keywords:
    "IT solutions Pune, AI services, IoT solutions, Cloud computing, Smart systems, Government IT partner, Digital transformation Maharashtra",
  generator: 'v0.dev',
  icons: {
    icon: '/canosolutions_logo.jpg',
    shortcut: '/canosolutions_logo.jpg',
    apple: '/canosolutions_logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${poppins.variable} font-poppins bg-white text-textPrimary`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
