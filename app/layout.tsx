import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoDevanagari.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="relative z-10 pt-14">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
