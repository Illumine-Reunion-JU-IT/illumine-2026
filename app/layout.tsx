import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://illumine-reunion-ju-it.vercel.app'),
  title: "Illumine 2026",
  description: "Official Silver Jubilee Reunion of Jadavpur University Information Technology Department.",
  openGraph: {
    title: "Illumine 2026",
    description: "Official Silver Jubilee Reunion of Jadavpur University Information Technology Department.",
    url: "https://illumine-reunion-ju-it.vercel.app/",
    siteName: "Illumine 2026",
    images: [
      {
        url: "/photos/Hero/logo.jpeg",
        width: 800,
        height: 800,
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
    images: ["/photos/Hero/logo.jpeg"],
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
        <Navbar />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
