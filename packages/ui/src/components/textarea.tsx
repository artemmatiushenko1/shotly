import * as React from 'react';

import { cn } from '@shotly/ui/lib/utils';

type TextareaProps = {
  showCharsCount?: boolean;
  maxChars?: number;
  error?: string;
} & React.ComponentProps<'textarea'>;

function Textarea({
  className,
  showCharsCount = false,
  maxChars = Infinity,
  error,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const [charCount, setCharCount] = React.useState(() => {
    // Initialize count based on controlled or uncontrolled value
    if (value !== undefined) {
      return typeof value === 'string' ? value.length : 0;
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'string' ? defaultValue.length : 0;
    }
    return 0;
  });

  const isControlled = value !== undefined;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Update count for uncontrolled components
      if (!isControlled) {
        setCharCount(e.target.value.length);
      }
      // Call user's onChange handler if provided
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  // Update count when controlled value changes
  React.useEffect(() => {
    if (isControlled) {
      setCharCount(typeof value === 'string' ? value.length : 0);
    }
  }, [value, isControlled]);

  const currentCharCount = isControlled
    ? typeof value === 'string'
      ? value.length
      : 0
    : charCount;

  return (
    <>
      <textarea
        data-slot="textarea"
        maxLength={maxChars}
        aria-invalid={!!error}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
          error ? 'aria-invalid:border-destructive' : '',
        )}
        {...props}
      />
      {showCharsCount && (
        <p className="text-xs text-muted-foreground text-right">
          {currentCharCount}/{maxChars === Infinity ? '∞' : maxChars}
        </p>
      )}
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </>
  );
}

export { Textarea };
