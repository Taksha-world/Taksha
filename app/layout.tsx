import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3, Noto_Sans_Devanagari } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Taksha — Where Posts Are Living Software",
  description:
    "Build, share, and fork running applications in your feed. Every post is a living program. No deploy step, no friction. Think GitHub meets Twitter for code.",
  keywords: ["code", "social", "live coding", "web apps", "developer tools", "India"],
  openGraph: {
    title: "Taksha — Where Posts Are Living Software",
    description: "Build, share, and fork running applications in your feed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${sourceSans.variable} ${notoDevanagari.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ToastProvider>
          <Navbar />
          <main className="relative z-10 pt-16">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
