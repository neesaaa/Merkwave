import type { Metadata } from "next";
import { Poppins, Tajawal } from "next/font/google";
import "./globals.css";
import Providers from "./providers";


export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
});



export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${tajawal.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
