'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shotly/ui/components/popover';
import { Button } from '@shotly/ui/components/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@shotly/ui/components/calendar';
import { useState } from 'react';
import dayjs from 'dayjs';

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          {date ? dayjs(date).format('DD/MM/YYYY') : <span>DD/MM/YYYY</span>}
          <CalendarIcon className="ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
