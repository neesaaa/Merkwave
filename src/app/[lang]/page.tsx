// FILE PATH: app/[lang]/page.tsx
// This is the primary Server Component responsible for data fetching and rendering the Client boundary.

import { getDictionary } from "@/content/dictionary";
import { Locale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocalizedHomeContent from './HomeClient';

// --- GENERATE STATIC PARAMS FOR STATIC EXPORT ---
export const dynamicParams = false;

export function generateStaticParams(): { lang: string }[] {
  return locales.map((lang) => ({ 
    lang: lang as string 
  }));
}

// --- METADATA GENERATION ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);
  const url = `https://www.merkwave.com/${locale}/`;

  return {
    title: dictionary.meta.siteName,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((lc) => [lc, `https://www.merkwave.com/${lc}/`])
      ),
    },
    openGraph: {
      title: dictionary.meta.siteName,
      description: dictionary.meta.description,
      url,
      siteName: "Merkwave",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
  };
}

// --- SERVER COMPONENT WRAPPER (The exported default function) ---
export default async function LocaleHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : null;

  if (!locale) {
    notFound();
  }

  // Fetch the correct dictionary for the current language
  const dict = getDictionary(locale);

  // Render the Dynamically imported Client Component, passing the server-fetched data.
  // This component will only render on the client, avoiding the framer-motion error.
  return <LocalizedHomeContent dict={dict} lang={locale} />;
}
