// Shared i18n configuration that can be imported by both client and server
export enum Locale {
  EN = 'en',
  UK = 'uk',
}

export const locales = [Locale.EN, Locale.UK] as const;

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
