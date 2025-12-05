import MobileClient from './MobileClient';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function MobilePage({ params }: Props) {
  const { lang } = await params;

  return <MobileClient dict={{}} lang={lang} />;
}
