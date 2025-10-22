'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon, Languages, XIcon } from 'lucide-react';

import { Badge } from '@shotly/ui/components/badge';
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

type LanguageOption = {
  value: string;
  label: string;
  flag: string;
};

const POPULAR_LANGUAGES: LanguageOption[] = [
  { value: 'English', label: 'English', flag: '🇬🇧' },
  { value: 'Spanish', label: 'Spanish', flag: '🇪🇸' },
  { value: 'German', label: 'German', flag: '🇩🇪' },
  { value: 'French', label: 'French', flag: '🇫🇷' },
  { value: 'Italian', label: 'Italian', flag: '🇮🇹' },
  { value: 'Portuguese', label: 'Portuguese', flag: '🇵🇹' },
  { value: 'Russian', label: 'Russian', flag: '🇷🇺' },
  { value: 'Polish', label: 'Polish', flag: '🇵🇱' },
  { value: 'Ukrainian', label: 'Ukrainian', flag: '🇺🇦' },
  { value: 'Czech', label: 'Czech', flag: '🇨🇿' },
  { value: 'Slovak', label: 'Slovak', flag: '🇸🇰' },
  { value: 'Hungarian', label: 'Hungarian', flag: '🇭🇺' },
  { value: 'Dutch', label: 'Dutch', flag: '🇳🇱' },
  { value: 'Swedish', label: 'Swedish', flag: '🇸🇪' },
  { value: 'Norwegian', label: 'Norwegian', flag: '🇳🇴' },
];

type LanguageSelectorProps = {
  inputId?: string;
  defaultLanguages?: string[];
};

const LanguageSelector = (props: LanguageSelectorProps) => {
  const { inputId, defaultLanguages = ['English'] } = props;

  const [open, setOpen] = React.useState(false);
  const [selectedLanguages, setSelectedLanguages] =
    React.useState<string[]>(defaultLanguages);

  const toggleLanguage = React.useCallback((language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language],
    );
  }, []);

  const removeLanguage = React.useCallback((language: string) => {
    setSelectedLanguages((prev) => prev.filter((item) => item !== language));
  }, []);

  const hasLanguages = selectedLanguages.length > 0;

  const getLanguageOption = React.useCallback(
    (language: string) =>
      POPULAR_LANGUAGES.find((option) => option.value === language),
    [],
  );

  const renderFlag = (language: string) =>
    getLanguageOption(language)?.flag ?? '🏳️';

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
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
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
                {POPULAR_LANGUAGES.map((language) => {
                  const isSelected = selectedLanguages.includes(language.value);
                  return (
                    <CommandItem
                      key={language.value}
                      value={language.value}
                      onSelect={() => toggleLanguage(language.value)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="mr-2">{language.flag}</span>
                      {language.label}
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
            <Badge
              key={language}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <span>{renderFlag(language)}</span>
              {language}
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  removeLanguage(language);
                }}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Remove ${language}`}
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export { LanguageSelector };
