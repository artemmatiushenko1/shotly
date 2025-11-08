'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Locale, locales, LOCALE_COOKIE_NAME } from './config';

export async function setLocale(locale: Locale, path?: string) {
  // Validate locale
  if (!locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  // Redirect to the provided path, or get from referer header, or default to '/'
  if (path) {
    redirect(path);
    return;
  }

  const headersList = await headers();
  const referer = headersList.get('referer');

  if (referer) {
    try {
      const url = new URL(referer);
      redirect(url.pathname + url.search);
      return;
    } catch {
      // Invalid URL, fall through to default
    }
  }

  // Default redirect
  redirect('/');
}
