import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://illumine-ju-it.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Illumine 2026",
  description: "Official Silver Jubilee Reunion of Jadavpur University Information Technology Department.",
  icons: {
    icon: "/images/logos/primary-icon.svg",
    shortcut: "/images/logos/primary-icon.svg",
    apple: "/images/logos/primary-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Illumine 2026",
    description: "Official Silver Jubilee Reunion of Jadavpur University Information Technology Department.",
    url: "/",
    siteName: "Illumine 2026",
    images: [
      {
        url: "/photos/Hero/hero.png",
        width: 1440,
        height: 714,
        alt: "Illumine 2026 Jadavpur University IT Reunion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Illumine 2026",
    description: "Official Silver Jubilee Reunion of Jadavpur University Information Technology Department.",
    images: ["/photos/Hero/hero.png"],
  },
};

/**
 * STEP 1: Global Layout
 * This RootLayout acts as the primary wrapper for all routes.
 * It enforces a consistent flex column structure containing the global Navbar,
 * the dynamically injected page content, and the Footer.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#070707] overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="flex-grow relative">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
