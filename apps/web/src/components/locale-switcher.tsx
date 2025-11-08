'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Button } from '@shotly/ui/components/button';
import { setLocale } from '@/i18n/actions';
import { Locale, locales } from '@/i18n/config';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function onSelectChange(newLocale: Locale) {
    startTransition(() => {
      setLocale(newLocale);
    });
  }

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectChange(loc)}
          disabled={isPending}
        >
          {loc.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
