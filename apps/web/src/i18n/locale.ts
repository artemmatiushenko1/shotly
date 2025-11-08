import 'server-only';

import { cookies } from 'next/headers';
import { Locale, locales, LOCALE_COOKIE_NAME } from './config';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME);

  if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale;
  }

  // Default to English
  return 'en';
}
