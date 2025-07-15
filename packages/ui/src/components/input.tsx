import * as React from 'react';

import { cn } from '@shotly/ui/lib/utils';

type InputProps = {
  error?: string;
} & React.ComponentProps<'input'>;

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <div>
      <input
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border-0 bg-transparent text-base transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'bg-gray-100 px-4 py-6 text-gray-900',
          className
        )}
        {...props}
      />
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </div>
  );
}

export { Input };
