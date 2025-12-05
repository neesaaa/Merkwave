import BusinessClient from './BusinessClient';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function BusinessPage({ params }: Props) {
  const { lang } = await params;

  return <BusinessClient dict={{}} lang={lang} />;
}
