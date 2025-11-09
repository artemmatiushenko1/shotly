'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { setLocale } from '@/i18n/actions';
import { Locale, locales } from '@/i18n/config';

const localeNames: Record<Locale, string> = {
  en: 'English',
  uk: 'Українська',
};

function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (value: string) => {
    if (locales.includes(value as Locale)) {
      startTransition(async () => {
        await setLocale(value as Locale);
        router.refresh();
      });
    }
  };

  return (
    <Select
      value={locale}
      onValueChange={handleLanguageChange}
      disabled={isPending}
    >
      <SelectTrigger
        showArrow={false}
        className="max-w-[130px] h-9 bg-transparent pl-3 shadow-none border-none gap-0"
      >
        <Globe className="size-4 text-gray-600 shrink-0 mr-3" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
