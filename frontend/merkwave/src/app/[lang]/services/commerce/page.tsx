import CommerceClient from './CommerceClient';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function CommercePage({ params }: Props) {
  const { lang } = await params;

  return <CommerceClient dict={{}} lang={lang} />;
}
