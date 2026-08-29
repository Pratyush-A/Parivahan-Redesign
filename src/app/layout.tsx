import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Oriya } from "next/font/google";
import AccessibilityUtilityBar from "@/components/layout/AccessibilityUtilityBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
});

const notoSansOriya = Noto_Sans_Oriya({
  subsets: ["oriya"],
  display: "swap",
  variable: "--font-oriya",
});

export const metadata: Metadata = {
  title: "Parivahan 2.0 — One Journey. Not 20 Forms.",
  description: "A citizen-first digital experience for India's transport services.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#172554",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable} ${notoSansOriya.variable}`}>
      <body>
        <AccessibilityUtilityBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
