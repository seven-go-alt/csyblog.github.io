import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CSY Blog",
    template: "%s | CSY Blog",
  },
  description: "Personal blog of CSY, sharing programming, tech, and life.",
  openGraph: {
    title: "CSY Blog",
    description: "Personal blog of CSY, sharing programming, tech, and life.",
    url: "https://csyblog.github.io",
    siteName: "CSY Blog",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSY Blog",
    description: "Personal blog of CSY, sharing programming, tech, and life.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextTopLoader color="#2563eb" showSpinner={false} height={3} />
          <ReadingProgress />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
