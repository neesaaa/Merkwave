import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Panchang Variable font for English (single file, all weights 200-800)
const panchang = localFont({
  src: "../../public/fonts/panchang/WEB/fonts/Panchang-Variable.woff2",
  variable: "--font-panchang",
  display: "swap",
  weight: "200 800",
  fallback: ["system-ui", "Arial", "Helvetica Neue", "sans-serif"],
});

// VIP Rawy font for Arabic
// Using size-adjust to match the visual size with Panchang font
const vipRawy = localFont({
  src: [
    {
      path: "../../public/fonts/vip_rawy/4_47.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/vip_rawy/4_48.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-vip-rawy",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Merkwave ",
    template: "%s | Merkwave",
  },
  description:
    "Merkwave delivers digital marketing, software, social media, SEO, and media production services to help brands grow.",
  metadataBase: new URL("https://www.merkwave.com"),
  openGraph: {
    title: "Merkwave ",
    description:
      "Merkwave delivers digital marketing, software, social media, SEO, and media production services to help brands grow.",
    url: "https://www.merkwave.com",
    siteName: "Merkwave",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merkwave ",
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
        className={`${panchang.variable} ${vipRawy.variable} bg-white text-slate-900 antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
