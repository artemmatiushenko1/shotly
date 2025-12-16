import 'server-only';
import { cookies } from 'next/headers';

import { Locale, LOCALE_COOKIE_NAME, locales } from './config';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME);

  if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale;
  }

  return Locale.EN;
}
