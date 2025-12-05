import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionary";
import { Locale, locales, isRTL } from "@/lib/i18n";

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
  const url = `https://www.merkwave.com/${locale}/terms/`;

  return {
    title: `${dictionary.legal.terms.title} | ${dictionary.meta.siteName}`,
    description: dictionary.legal.terms.intro,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
  locales.map((lc) => [lc, `https://www.merkwave.com/${lc}/terms/`])
      ),
    },
    openGraph: {
      title: dictionary.legal.terms.title,
      description: dictionary.legal.terms.intro,
      url,
      siteName: dictionary.meta.siteName,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "article",
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : null;

  if (!locale) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const content = dictionary.legal.terms;
  const direction = isRTL(locale) ? "rtl" : "ltr";
  const align = direction === "rtl" ? "text-right" : "text-left";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-16 md:px-6">
      <header className={`flex flex-col gap-4 ${align}`}>
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
          {dictionary.meta.siteName}
        </span>
        <h1 className="text-4xl font-bold md:text-5xl">{content.title}</h1>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          {content.updated}
        </p>
        <p className="text-lg text-slate-600">{content.intro}</p>
      </header>
      <article className={`space-y-8 text-slate-700 ${align}`}>
        {content.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">
              {section.heading}
            </h2>
            <p className="leading-relaxed text-slate-600">{section.body}</p>
          </section>
        ))}
      </article>
      <footer className={`rounded-3xl border border-blue-100 bg-blue-50/70 p-6 text-sm text-slate-600 ${align}`}>
        {direction === "rtl"
          ? "للأسئلة القانونية راسلنا عبر legal@merkwave.com"
          : "For legal inquiries, email legal@merkwave.com"}
      </footer>
    </div>
  );
}
