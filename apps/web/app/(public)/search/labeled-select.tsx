'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { cn } from '@shotly/ui/lib/utils';

type LabeledSelectProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Select>, 'children'>;

function LabeledSelect({
  label,
  placeholder,
  value,
  onValueChange,
  disabled,
  children,
  className,
  ...selectProps
}: LabeledSelectProps) {
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
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        {...selectProps}
      >
        <SelectTrigger className="font-medium dark:group-hover:bg-input/50 w-full rounded-t-none border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}

export { LabeledSelect };
export type { LabeledSelectProps };
