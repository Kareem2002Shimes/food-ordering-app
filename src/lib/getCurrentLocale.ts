import { Locale } from '@/i18n.config';
import { headers } from 'next/headers';

export const getCurrentLocale = async () => {
  const url = (await headers()).get('x-url');
  const locale = url?.split('/')[3] as Locale;
  return locale;
};
