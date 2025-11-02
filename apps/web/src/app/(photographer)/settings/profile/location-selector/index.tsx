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
import { LocationDetails } from '@/domain/locations';
import { NovaPostGeocodingService } from '@/lib/geocoding/nova-post/nova-post-geocoding.service';
import { clientEnv } from '@/env/client';

const geocodingService = new NovaPostGeocodingService(
  clientEnv.NEXT_PUBLIC_NOVA_POST_API_URL,
  clientEnv.NEXT_PUBLIC_NOVA_POST_API_KEY,
);

type LocationSelectorProps = {
  value: LocationDetails[];
  onChange: (locations: LocationDetails[]) => void;

  inputId?: string;
  defaultLocations?: string[];
};

const LocationSelector = (props: LocationSelectorProps) => {
  const { inputId, value, onChange } = props;

  const [searchResults, setSearchResults] = useState<LocationDetails[]>([]);

  const [open, setOpen] = useState(false);

  const selectedLocationExternalIds = value.map(
    (locationDetails) => locationDetails.externalId,
  );

  const toggleLocation = (location: LocationDetails) => {
    const newLocations = selectedLocationExternalIds.includes(
      location.externalId,
    )
      ? value.filter((item) => item !== location)
      : [...value, location];

    onChange(newLocations);
  };

  const removeLocation = (location: LocationDetails) => {
    const newLocations = value.filter(
      (item) => item.externalId !== location.externalId,
    );
    onChange(newLocations);
  };

  const hasSelectedLocations = value.length > 0;

  // TODO: move to hook
  const searchLocations = debounce(async (searchString: string) => {
    if (searchString.trim().length === 0) return;

    const response =
      await geocodingService.searchUkrainianSettlementByName(searchString);
    setSearchResults(response);
  }, 1000);

  // TODO: add removable prop to badge
  const renderTag = (location: LocationDetails) => (
    <Badge
      key={location.externalId}
      variant="secondary"
      className="flex items-center gap-1"
    >
      {location.name}
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          removeLocation(location);
        }}
        className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={`Remove ${location.name}`}
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
                    <DropdownMenuCheckboxItem
                      key={location.externalId}
                      checked={selectedLocationExternalIds.includes(
                        location.externalId,
                      )}
                      onCheckedChange={() => toggleLocation(location)}
                    >
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
        <div className="flex flex-wrap gap-2">{value.map(renderTag)}</div>
      )}
    </div>
  );
};

export { LocationSelector };
