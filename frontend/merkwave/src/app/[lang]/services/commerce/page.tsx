import CommerceClient from "./CommerceClient";
import { locales } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function CommercePage({ params }: Props) {
  const { lang } = await params;

  return <CommerceClient dict={{}} lang={lang} />;
}
