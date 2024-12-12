import 'server-only';

import { Locale } from '@/i18n.config';
import { Languages } from '@/constants/enums';

const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

const getTrans = async (locale: Locale) => {
  return locale === Languages.ARABIC ? dictionaries.ar() : dictionaries.en();
};

export default getTrans;
