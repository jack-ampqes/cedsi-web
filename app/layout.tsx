import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Footer } from "@/components/footer"
import { MotionProvider } from "@/components/motion-provider"
import { Navbar } from "@/components/navbar"
import { SiteBackground } from "@/components/site-background"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CEDSI | Controls & Electrical Design Services",
  description:
    "Expert electrical engineering, power systems design, industrial controls, PLC programming, and panel fabrication services. Delivering precision engineering solutions for over 30 years.",
  keywords: [
    "electrical engineering",
    "industrial controls",
    "PLC programming",
    "panel fabrication",
    "power systems",
    "automation",
  ],
  authors: [{ name: "CEDSI" }],
  icons: {
    icon: {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
    apple: "/favicon.svg",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0c0a34",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${geistMono.variable} bg-background`}
    >
      <body className="relative min-h-screen overflow-x-hidden font-sans antialiased">
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-100 -translate-y-24 rounded-none bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteBackground />
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
        <Toaster />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
