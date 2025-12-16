'use client';

import { ChevronsUpDownIcon, MapPinPlus, XIcon } from 'lucide-react';

import LocationSearch from '@/_components/location-search/location-search';
import { LocationDetails } from '@/entities/models/locations';

import { Badge } from '@shotly/ui/components/badge';
import { Button } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

type LocationSelectorProps = {
  value: LocationDetails[];
  onChange: (locations: LocationDetails[]) => void;

  inputId?: string;
  error?: string;
};

const LocationSelector = (props: LocationSelectorProps) => {
  const { value, onChange, error } = props;

  const removeLocation = (location: LocationDetails) => {
    const newLocations = value.filter(
      (item) => item.externalId !== location.externalId,
    );
    onChange(newLocations);
  };

  const selectedLocationExternalIds = value.map(
    (locationDetails) => locationDetails.externalId,
  );

  const handleChange = (location: LocationDetails) => {
    const newLocations = selectedLocationExternalIds.includes(
      location.externalId,
    )
      ? value.filter((item) => item !== location)
      : [...value, location];

    onChange(newLocations);
  };

  const hasSelectedLocations = value.length > 0;

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
      <LocationSearch
        value={value}
        onChange={handleChange}
        error={error}
        trigger={
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between text-left font-normal text-muted-foreground',
            )}
          >
            <span className="flex gap-3 items-center">
              <MapPinPlus /> Search locations...
            </span>
            <ChevronsUpDownIcon />
          </Button>
        }
      />
      {hasSelectedLocations && (
        <div className="flex flex-wrap gap-2">{value.map(renderTag)}</div>
      )}
    </div>
  );
};

export { LocationSelector };
