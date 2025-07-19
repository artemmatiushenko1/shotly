import * as React from 'react';

import { cn } from '@shotly/ui/lib/utils';

type TextareaProps = {
  showCharsCount?: boolean;
  maxChars?: number;
} & React.ComponentProps<'textarea'>;

function Textarea({
  className,
  showCharsCount = false,
  maxChars = Infinity,
  ...props
}: TextareaProps) {
  return (
    <>
      <textarea
        data-slot="textarea"
        maxLength={maxChars}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...props}
      />
      {showCharsCount && (
        <p className="text-xs text-muted-foreground">
          {typeof props.value === 'string' ? (props.value?.length ?? 0) : 0}/
          {maxChars}
        </p>
      )}
    </>
  );
}

export { Textarea };
