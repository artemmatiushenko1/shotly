'use server';

import { cookies } from 'next/headers';
import { Locale, locales, LOCALE_COOKIE_NAME } from './config';

export async function setLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  // revalidatePath('/');
}
