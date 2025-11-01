'use client';

import {
  ChevronsUpDownIcon,
  MapPinPlus,
  SearchIcon,
  XIcon,
} from 'lucide-react';

import { Badge } from '@shotly/ui/components/badge';
import { Button } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import { useState } from 'react';
import { GeocodingService, LocationDetails } from '@/lib/geocoding.service';
import debounce from 'debounce';
import { Input } from '@shotly/ui/components/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';

const geocodingService = new GeocodingService();

type LocationSelectorProps = {
  inputId?: string;
  defaultLocations?: string[];
};

const LocationSelector = (props: LocationSelectorProps) => {
  const {
    inputId,
    defaultLocations = ['Prague, Czechia', 'Budapest, Hungary'],
  } = props;

  const [searchResults, setSearchResults] = useState<LocationDetails[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] =
    useState<string[]>(defaultLocations);

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location],
    );
  };

  const removeLocation = (location: string) => {
    setSelectedLocations((prev) => prev.filter((item) => item !== location));
  };

  const hasSelectedLocations = selectedLocations.length > 0;

  const searchLocations = debounce(async (searchString: string) => {
    if (searchString.trim().length === 0) return;

    const response = await geocodingService.searchLocationByName(searchString);
    setSearchResults(response);
  }, 1000);

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
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
          align="start"
        >
          <div className="flex items-center pl-2">
            <SearchIcon className="size-4 text-muted-foreground" />
            <Input
              id={inputId}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-7 p-0 pl-3"
              onChange={(e) => searchLocations(e.target.value)}
              placeholder="Start typing..."
              autoFocus
            />
          </div>
          {searchResults.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {searchResults.map((location) => {
                  return (
                    <DropdownMenuCheckboxItem key={location.externalId}>
                      <div>
                        <p>{location.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {location.displayName}
                        </p>
                      </div>
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {hasSelectedLocations && (
        <div className="flex flex-wrap gap-2">
          {selectedLocations.map(renderTag)}
        </div>
      )}
    </div>
  );
};

export { LocationSelector };
