'use client';

import { CheckIcon, ChevronsUpDownIcon, Languages } from 'lucide-react';

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
import LanguageTag from '@/components/language-tag';
import { Language } from '@/domain/language';
import { useState } from 'react';

type LanguageSelectorProps = {
  inputId?: string;
  languageOptions: Language[];
  defaultLanguages?: Language[];
};

const LanguageSelector = (props: LanguageSelectorProps) => {
  const { inputId, defaultLanguages, languageOptions } = props;

  const [open, setOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(
    defaultLanguages ?? [],
  );

  const toggleLanguage = (language: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language],
    );
  };

  const removeLanguage = (languageCode: string) => {
    setSelectedLanguages((prev) =>
      prev.filter((item) => item.code !== languageCode),
    );
  };

  const hasLanguages = selectedLanguages.length > 0;

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
              <Languages /> Search languages...
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
              placeholder="Search languages..."
            />
            <CommandList>
              <CommandEmpty>No languages found.</CommandEmpty>
              <CommandGroup>
                {languageOptions.map((language) => {
                  const isSelected = selectedLanguages.includes(language);

                  return (
                    <CommandItem
                      key={language.code}
                      value={language.code}
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
          {selectedLanguages.map((language) => (
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
    </div>
  );
};

export { LanguageSelector };
