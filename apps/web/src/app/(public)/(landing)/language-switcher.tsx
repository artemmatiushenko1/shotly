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
import { cn } from '@shotly/ui/lib/utils';

const localeNames: Record<Locale, string> = {
  en: 'English',
  uk: 'Українська',
};

type LanguageSwitcherProps = {
  variant?: 'contrast' | 'default';
};

function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
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
        className={cn(
          'max-w-[130px] h-9 bg-transparent pl-3 shadow-none border-none gap-0',
          variant === 'contrast' ? 'text-foreground' : 'text-white',
        )}
      >
        <Globe
          className={cn(
            'size-4 shrink-0 mr-3',
            variant === 'contrast' ? 'text-gray-600' : 'text-white',
          )}
        />
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
