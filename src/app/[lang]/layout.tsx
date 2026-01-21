import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/content/dictionary";
import { Locale, locales, isRTL } from "@/lib/i18n";
import IntroLoader from "@/components/IntroLoader";
import MobileLogger from "@/components/MobileLogger";
import ErrorBoundary from "@/components/ErrorBoundary ";


export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : null;

  if (!locale) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.siteName,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
  canonical: `https://www.merkwave.com/${locale}/`,
      languages: Object.fromEntries(
  locales.map((l) => [l, `https://www.merkwave.com/${l}/`])
      ),
    },
    openGraph: {
      title: dictionary.meta.siteName,
      description: dictionary.meta.description,
  url: `https://www.merkwave.com/${locale}/`,
      siteName: "Merkwave",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : null;

  if (!locale) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const direction = isRTL(locale) ? "rtl" : "ltr";

  return (
    <ErrorBoundary>
      <div
        lang={locale}
        dir={direction}
        className="flex min-h-screen flex-col bg-white"
        suppressHydrationWarning
      >
        <IntroLoader />
        <MobileLogger />
        <div suppressHydrationWarning>
          <Navbar lang={locale} />
        </div>
        <main className="flex-1" id="content" suppressHydrationWarning>
          {children}
        </main>
        <Footer lang={locale} />
      </div>
    </ErrorBoundary>
    
  );
}
