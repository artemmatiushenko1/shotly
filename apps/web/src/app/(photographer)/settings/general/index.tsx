'use client';

import { Input } from '@shotly/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { LabeledControl } from '../labeled-control';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition, useId } from 'react';
import { setLocale } from '@/i18n/actions';
import { Locale, locales } from '@/i18n/config';

type GeneralSettingsProps = {
  userEmail: string;
};

const GeneralSettings = ({ userEmail }: GeneralSettingsProps) => {
  const t = useTranslations('settings.general');
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const emailId = useId();
  const languageId = useId();

  const handleLanguageChange = (value: string) => {
    if (locales.includes(value as Locale)) {
      startTransition(() => {
        setLocale(value as Locale);
      });
    }
  };

  const localeNames: Record<Locale, string> = {
    en: t('language.options.en'),
    uk: t('language.options.uk'),
  };

  const localeFlags: Record<Locale, string> = {
    en: '🇬🇧',
    uk: '🇺🇦',
  };

  return (
    <div className="space-y-8 pb-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{t('title')}</h2>
        <p className="text-sm text-muted-foreground">{t('description')}</p>
      </div>
      <LabeledControl
        title={t('email.title')}
        description={t('email.description')}
        controlId={emailId}
        controlNode={
          <Input
            id={emailId}
            type="email"
            value={userEmail}
            readOnly
            disabled
            className="bg-muted"
          />
        }
      />
      <LabeledControl
        title={t('language.title')}
        description={t('language.description')}
        controlId={languageId}
        controlNode={
          <Select
            value={locale}
            onValueChange={handleLanguageChange}
            disabled={isPending}
          >
            <SelectTrigger id={languageId} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locales.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  <span className="flex items-center gap-2">
                    <span>{localeFlags[loc]}</span>
                    <span>{localeNames[loc]}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
};

export { GeneralSettings };
