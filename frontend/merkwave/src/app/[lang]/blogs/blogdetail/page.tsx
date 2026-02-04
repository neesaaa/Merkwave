'use client';

import { use, Suspense } from "react";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { BlogDetailQueryClient } from "@/components/BlogDetailQueryClient";

interface BlogDetailPageProps {
  params: Promise<{ lang: string }>;
}

function LoadingBlogDetail({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2027] to-[#203a43]">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6"></div>
          <p className="text-slate-300 text-lg">
            {locale === 'ar' ? 'جاري تحميل المقال...' : 'Loading blog...'}
          </p>
        </div>
      </div>
    </div>
  );
}

function BlogDetailContent({ params }: BlogDetailPageProps) {
  const { lang } = use(params);
  
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;

  return <BlogDetailQueryClient locale={locale} />;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f2027] to-[#203a43]">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6"></div>
            <p className="text-slate-300 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <BlogDetailContent params={params} />
    </Suspense>
  );
}