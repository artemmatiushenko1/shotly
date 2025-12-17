'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@shotly/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@shotly/ui/components/dropdown-menu';
import { cn } from '@shotly/ui/lib/utils';

type CountSelectProps = {
  label: string;
  values: string[];
  options: { value: string; label: string | React.ReactNode }[];
  onChange?: (values: string[]) => void;
};

function CountSelect(props: CountSelectProps) {
  const { label, values, options, onChange } = props;

  const [open, setOpen] = useState(false);

  const toggleSelection = (value: string) => {
    onChange?.(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          variant={values.length > 0 ? 'default' : 'outline'}
          className={
            'flex items-center h-auto py-2 px-4 rounded-full shadow-none'
          }
        >
          <span className="font-medium text-sm">{label}</span>
          {values.length > 0 && (
            <span className="flex items-center justify-center bg-white text-[#1A202C] font-bold text-xs h-5 w-5 rounded-full">
              {values.length}
            </span>
          )}
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 text-muted-foreground',
              values.length > 0 && 'text-accent',
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel className="text-muted-foreground font-normal text-xs">
          {label}
        </DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={values.includes(option.value)}
            onCheckedChange={() => toggleSelection(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CountSelect;
