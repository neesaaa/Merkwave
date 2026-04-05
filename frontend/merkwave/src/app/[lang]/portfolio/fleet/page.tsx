import { Suspense } from "react";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { FleetDetailClient } from "./FleetDetailClient";

interface FleetDetailPageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function FleetDetailPage({
  params,
}: FleetDetailPageProps) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-[#020c1b] to-[#0a1628] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6" />
            <p className="text-slate-300 text-lg">Loading fleet data...</p>
          </div>
        </div>
      }
    >
      <FleetDetailClient locale={locale} />
    </Suspense>
  );
}
