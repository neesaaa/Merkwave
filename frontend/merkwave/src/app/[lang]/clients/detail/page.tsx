import { Suspense } from "react";
import { locales } from "@/lib/i18n";
import ClientDetailContent from "./ClientDetailContent";

interface ClientDetailQueryPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Page({ params }: ClientDetailQueryPageProps) {
  const { lang } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2027] to-[#203a43]">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6"></div>
              <p className="text-slate-300 text-lg">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <ClientDetailContent lang={lang} />
    </Suspense>
  );
}
