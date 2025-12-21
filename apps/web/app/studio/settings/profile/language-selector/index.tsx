'use client';

import { CheckIcon, ChevronsUpDownIcon, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Language } from '@/entities/models/language';

import { Button } from '@shotly/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@shotly/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shotly/ui/components/popover';
import { cn } from '@shotly/ui/lib/utils';

import LanguageTag from '../../../../_components/language-tag';

type LanguageSelectorProps = {
  value: Language[];
  onChange: (languages: Language[]) => void;

  inputId?: string;
  languageOptions: Language[];
  error?: string;
};

const LanguageSelector = (props: LanguageSelectorProps) => {
  const { value, inputId, languageOptions, onChange, error } = props;
  const t = useTranslations('settings.profile.fields.languages');

  const [open, setOpen] = useState(false);

  const toggleLanguage = (language: Language) => {
    const newLanguages = value.includes(language)
      ? value.filter((item) => item !== language)
      : [...value, language];

    onChange(newLanguages);
  };

  const removeLanguage = (languageCode: string) => {
    const newLanguages = value.filter((item) => item.code !== languageCode);
    onChange(newLanguages);
  };

  const hasLanguages = value.length > 0;

  const selectedLanguageCodes = value.map((language) => language.code);

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between text-left font-normal text-muted-foreground',
            )}
          >
            <span className="flex items-center gap-3">
              <Languages /> {t('searchPlaceholder')}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0"
        >
          <Command>
            <CommandInput
              autoFocus
              id={inputId}
              placeholder={t('searchPlaceholder')}
            />
            <CommandList>
              <CommandEmpty>No languages found.</CommandEmpty>
              <CommandGroup>
                {languageOptions.map((language) => {
                  const isSelected = selectedLanguageCodes.includes(
                    language.code,
                  );

                  return (
                    <CommandItem
                      key={language.code}
                      value={language.name}
                      onSelect={() => toggleLanguage(language)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {hasLanguages && (
        <div className="flex flex-wrap gap-2">
          {value.map((language) => (
            <LanguageTag
              removable
              key={language.code}
              code={language.code}
              flag={language.flag}
              name={language.name}
              onRemove={removeLanguage}
            />
          ))}
        </div>
      )}
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </div>
  );
};

export { LanguageSelector };
