import { Badge } from '@shotly/ui/components/badge';
import { XIcon } from 'lucide-react';
import React from 'react';

type LanguageTagProps = {
  flag: string;
  name: string;
  code: string;
  removable?: boolean;
  onRemove?: (languageCode: string) => void;
};

function LanguageTag(props: LanguageTagProps) {
  const { flag, name, code, removable = false, onRemove } = props;

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <span>{flag}</span>
      {name}
      {removable && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove?.(code);
          }}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`Remove ${name}`}
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}

export default LanguageTag;
