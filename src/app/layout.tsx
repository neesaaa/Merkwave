import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Merkwave Marketing Agency",
    template: "%s | Merkwave",
  },
  description:
    "Merkwave delivers digital marketing, software, social media, SEO, and media production services to help brands grow.",
  metadataBase: new URL("https://www.merkwave.com"),
  openGraph: {
    title: "Merkwave Marketing Agency",
    description:
      "Merkwave delivers digital marketing, software, social media, SEO, and media production services to help brands grow.",
    url: "https://www.merkwave.com",
    siteName: "Merkwave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merkwave Marketing Agency",
    description:
      "Merkwave delivers digital marketing, software, social media, SEO, and media production services to help brands grow.",
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
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-slate-900 antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
