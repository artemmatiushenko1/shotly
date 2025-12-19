'use client';

import { CalendarIcon } from 'lucide-react';
import type { DayPickerProps } from 'react-day-picker';
import { uk } from 'react-day-picker/locale';

import { Button } from '@shotly/ui/components/button';
import { Calendar } from '@shotly/ui/components/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shotly/ui/components/popover';
import { DateFormat, formatDate } from '@shotly/ui/lib/date';
import { cn } from '@shotly/ui/lib/utils';

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  buttonClassName?: string;
  popoverContentClassName?: string;
  align?: 'start' | 'center' | 'end';
  dateFormat?: string;
  disabled?: boolean;
} & Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>;

function DatePicker({
  value,
  onChange,
  id,
  name,
  placeholder = 'Pick a date',
  error,
  className,
  buttonClassName,
  popoverContentClassName,
  align = 'start',
  dateFormat = DateFormat.LONG,
  disabled,
  ...calendarProps
}: DatePickerProps) {
  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
  };

  return (
    <div className={cn('w-full', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            data-empty={!value}
            className={cn(
              'data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal',
              buttonClassName,
            )}
          >
            {value ? (
              formatDate(value, calendarProps.locale?.code ?? 'en', dateFormat)
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-auto p-0', popoverContentClassName)}
          align={align}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            className="rounded-md border"
            {...calendarProps}
            locale={calendarProps.locale?.code === 'uk' ? uk : undefined}
          />
        </PopoverContent>
      </Popover>
      {value && name && (
        <input type="hidden" name={name} value={value.toISOString()} />
      )}
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </div>
  );
}

export { DatePicker };
export type { DatePickerProps };
