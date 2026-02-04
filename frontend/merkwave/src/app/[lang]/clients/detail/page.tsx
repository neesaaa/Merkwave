'use client'

import { Suspense, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import ClientDetailPage from '@/components/ClientDetailPage';

interface ClientDetailQueryPageProps {
  params: Promise<{
    lang: string;
  }>;
}

function ClientDetailContent({ params }: ClientDetailQueryPageProps) {
  const { lang } = use(params);
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    notFound();
  }

  // Validate locale
  const locale = lang === 'ar' ? 'ar' : 'en';

  return <ClientDetailPage locale={locale} clientId={clientId} />;
}

export default function Page({ params }: ClientDetailQueryPageProps) {
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
      <ClientDetailContent params={params} />
    </Suspense>
  );
}
