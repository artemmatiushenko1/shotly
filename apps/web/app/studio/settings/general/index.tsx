'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useState, useTransition } from 'react';

import { Input } from '@shotly/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { useTheme } from '@shotly/ui/hooks/use-theme';

import { setLocale } from '../../../_i18n/actions';
import { Locale, locales } from '../../../_i18n/config';
import { LabeledControl } from '../labeled-control';

type GeneralSettingsProps = {
  userEmail: string;
};

type ThemeOption = 'light' | 'dark';

const GeneralSettings = ({ userEmail }: GeneralSettingsProps) => {
  const t = useTranslations('settings.general');
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const { resolvedTheme, setTheme } = useTheme();
  const [isThemeMounted, setIsThemeMounted] = useState(false);

  const emailId = useId();
  const languageId = useId();
  const themeId = useId();

  useEffect(() => {
    setIsThemeMounted(true);
  }, []);

  const handleLanguageChange = (value: string) => {
    if (locales.includes(value as Locale)) {
      startTransition(() => {
        setLocale(value as Locale);
      });
    }
  };

  const handleThemeChange = (value: ThemeOption) => {
    setTheme(value);
  };

  const localeNames: Record<Locale, string> = {
    en: t('language.options.en'),
    uk: t('language.options.uk'),
  };

  const localeFlags: Record<Locale, string> = {
    en: '🇬🇧',
    uk: '🇺🇦',
  };

  const themeIcons: Record<ThemeOption, string> = {
    light: '🌞',
    dark: '🌚',
  };

  const themeOptions: ThemeOption[] = ['light', 'dark'];

  const currentTheme = (resolvedTheme as ThemeOption | undefined) ?? 'light';

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
      <LabeledControl
        title={t('theme.title')}
        description={t('theme.description')}
        controlId={themeId}
        controlNode={
          <Select
            value={isThemeMounted ? currentTheme : undefined}
            onValueChange={(value) => handleThemeChange(value as ThemeOption)}
            disabled={!isThemeMounted}
          >
            <SelectTrigger id={themeId} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  <span className="flex items-center gap-2">
                    <span>{themeIcons[option]}</span>
                    <span>{t(`theme.options.${option}`)}</span>
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
