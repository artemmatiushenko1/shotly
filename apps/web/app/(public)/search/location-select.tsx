import { ChevronDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import LocationSearch from '@/_components/location-search/location-search';
import { LocationDetails } from '@/entities/models/locations';

import { buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

type LocationSelectProps = {
  value: LocationDetails | null;
  onValueChange: (value: LocationDetails | null) => void;
  className?: string;
  label: string;
};

function LocationSelect(props: LocationSelectProps) {
  const t = useTranslations('landing.searchPage.filters');

  const { className, label, onValueChange, value } = props;

  const handleChange = (location: LocationDetails) => {
    const shouldReset = value?.externalId === location.externalId;
    const valueToSet = shouldReset ? null : location;
    onValueChange(valueToSet);
  };

  return (
    <div
      className={cn(
        'border-input group bg-background focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative w-full rounded-md border transition-[color] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-[input:is(:disabled)]:*:pointer-events-none',
        className,
      )}
    >
      <label className="text-muted-foreground dark:bg-input/30 dark:group-hover:bg-input/50 block px-3 pt-2 text-xs font-medium">
        {label}
      </label>
      <LocationSearch
        value={[value].filter(Boolean) as LocationDetails[]}
        onChange={handleChange}
        trigger={
          <button
            data-placeholder={!value ? true : undefined}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              "data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
              'font-medium dark:group-hover:bg-input/50 w-full rounded-t-none border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 justify-between hover:bg-transparent active:scale-100',
            )}
          >
            {value?.name ?? t('location.placeholder')}
            <ChevronDownIcon className="size-4 text-muted-foreground opacity-50" />
          </button>
        }
      />
    </div>
  );
}

export default LocationSelect;
