import BusinessClient from "./BusinessClient";
import { locales } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function BusinessPage({ params }: Props) {
  const { lang } = await params;

  return <BusinessClient dict={{}} lang={lang} />;
}
