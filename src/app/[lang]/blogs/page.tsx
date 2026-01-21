import { notFound } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import BlogsClient from "./BlogsClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function BlogsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return <BlogsClient dict={dict} lang={lang} />;
}
