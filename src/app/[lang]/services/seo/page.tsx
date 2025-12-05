import SeoClient from './SeoClient';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function SeoPage({ params }: Props) {
  const { lang } = await params;

  return <SeoClient dict={{}} lang={lang} />;
}
