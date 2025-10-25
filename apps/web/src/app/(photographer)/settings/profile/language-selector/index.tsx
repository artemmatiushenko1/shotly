'use client';

import * as React from 'react';
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
import LanguageTag, { Language, LanguageInfo } from '@/components/language-tag';

const SUPPORTED_LANGUAGES = [
  Language.ENGLISH,
  Language.SPANISH,
  Language.GERMAN,
  Language.FRENCH,
  Language.ITALIAN,
  Language.PORTUGUESE,
  Language.POLISH,
  Language.UKRAINIAN,
  Language.CZECH,
  Language.SLOVAK,
  Language.HUNGARIAN,
  Language.DUTCH,
  Language.SWEDISH,
  Language.NORWEGIAN,
];

type LanguageSelectorProps = {
  inputId?: string;
  defaultLanguages?: Language[];
};

const LanguageSelector = (props: LanguageSelectorProps) => {
  const { inputId, defaultLanguages = [Language.ENGLISH] } = props;

  const [open, setOpen] = React.useState(false);
  const [selectedLanguages, setSelectedLanguages] =
    React.useState<Language[]>(defaultLanguages);

  const toggleLanguage = React.useCallback((language: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language],
    );
  }, []);

  const removeLanguage = React.useCallback((language: Language) => {
    setSelectedLanguages((prev) => prev.filter((item) => item !== language));
  }, []);

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
              id={inputId}
              placeholder="Search languages..."
              autoFocus
            />
            <CommandList>
              <CommandEmpty>No languages found.</CommandEmpty>
              <CommandGroup>
                {SUPPORTED_LANGUAGES.map((language) => {
                  const languageInfo = LanguageInfo.for(language);

                  const isSelected = selectedLanguages.includes(language);

                  return (
                    <CommandItem
                      key={language}
                      value={language}
                      onSelect={() => toggleLanguage(language)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="mr-2">{languageInfo.flag}</span>
                      {languageInfo.name}
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
              key={language}
              removable
              language={language}
              onRemove={removeLanguage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { LanguageSelector };
