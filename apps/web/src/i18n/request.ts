import 'server-only';

import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Locale, locales, LOCALE_COOKIE_NAME } from './config';

export default getRequestConfig(async () => {
  // Get locale from cookie, default to 'en'
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME);

  let locale: Locale = 'en';
  if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
    locale = localeCookie.value as Locale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
