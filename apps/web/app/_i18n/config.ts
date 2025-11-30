// Shared i18n configuration that can be imported by both client and server
export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
