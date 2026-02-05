"use client";

import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import ClientDetailPage from "@/components/ClientDetailPage";

interface ClientDetailContentProps {
  lang: string;
}

export default function ClientDetailContent({
  lang,
}: ClientDetailContentProps) {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  if (!clientId) {
    notFound();
  }

  // Validate locale
  const locale = lang === "ar" ? "ar" : "en";

  return <ClientDetailPage locale={locale} clientId={clientId} />;
}
