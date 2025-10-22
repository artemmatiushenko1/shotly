'use client';

import * as React from 'react';
import { ChevronsUpDownIcon, MapPinPlus, XIcon } from 'lucide-react';

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

const SUGGESTED_LOCATIONS = [
  'Prague, Czechia',
  'Brno, Czechia',
  'Ostrava, Czechia',
  'Ceske Budejovice, Czechia',
  'Pilsen, Czechia',
  'Bratislava, Slovakia',
  'Vienna, Austria',
  'Berlin, Germany',
  'Munich, Germany',
  'Budapest, Hungary',
  'Warsaw, Poland',
  'Krakow, Poland',
];

type LocationSelectorProps = {
  inputId?: string;
  defaultLocations?: string[];
};

const LocationSelector = (props: LocationSelectorProps) => {
  const {
    inputId,
    defaultLocations = ['Prague, Czechia', 'Budapest, Hungary'],
  } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedLocations, setSelectedLocations] =
    React.useState<string[]>(defaultLocations);

  const toggleLocation = React.useCallback((location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location],
    );
  }, []);

  const removeLocation = React.useCallback((location: string) => {
    setSelectedLocations((prev) => prev.filter((item) => item !== location));
  }, []);

  const hasSelectedLocations = selectedLocations.length > 0;

  const renderTag = (location: string) => (
    <Badge
      key={location}
      variant="secondary"
      className="flex items-center gap-1"
    >
      {location}
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          removeLocation(location);
        }}
        className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={`Remove ${location}`}
      >
        <XIcon className="h-3 w-3" />
      </button>
    </Badge>
  );

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
            <span className="flex gap-3 items-center">
              <MapPinPlus /> Search locations...
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
              placeholder="Search locations..."
              autoFocus
            />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                {SUGGESTED_LOCATIONS.map((location) => {
                  return (
                    <CommandItem
                      key={location}
                      value={location}
                      onSelect={() => toggleLocation(location)}
                    >
                      {location}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {hasSelectedLocations && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map(renderTag)}
        </div>
      )}
    </div>
  );
};

export { LocationSelector };
