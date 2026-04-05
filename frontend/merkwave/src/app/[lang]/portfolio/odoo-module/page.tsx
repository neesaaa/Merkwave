import { Suspense } from "react";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { OdooModuleDetailClient } from "./OdooModuleDetailClient";

interface OdooModulePageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OdooModulePage({ params }: OdooModulePageProps) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-6" />
            <p className="text-slate-300 text-lg">Loading module...</p>
          </div>
        </div>
      }
    >
      <OdooModuleDetailClient locale={locale} />
    </Suspense>
  );
}
