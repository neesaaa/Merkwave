import React from 'react'
import Odoo from './Odoo'
import { locales } from '@/lib/i18n';

interface propsOdoo{
    params:{
        lang:string;
    };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}


const page = async ({ params }: propsOdoo) => {
  const {lang}= await params;
  return (
      <Odoo lang={lang} />
  )
}

export default page
