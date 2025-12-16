import debounce from 'debounce';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { LocationDetails } from '@/entities/models/locations';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import { Input } from '@shotly/ui/components/input';

import { searchLocationsAction } from './actions';

type LocationSelectorProps = {
  value: LocationDetails[];
  onChange: (locations: LocationDetails[]) => void;

  inputId?: string;
  error?: string;

  trigger: React.ReactNode;
};

function LocationSearch(props: LocationSelectorProps) {
  const { inputId, value, onChange, error, trigger } = props;

  const [searchResults, setSearchResults] = useState<LocationDetails[]>([]);

  const [open, setOpen] = useState(false);

  const searchLocations = debounce(async (searchString: string) => {
    if (searchString.trim().length === 0) return;

    const response = await searchLocationsAction(searchString);
    setSearchResults(response);
  }, 1000);

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

  return (
    <div className="space-y-3">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
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
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </div>
  );
}

export default LocationSearch;
