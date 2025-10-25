import { Badge } from '@shotly/ui/components/badge';
import { XIcon } from 'lucide-react';
import React from 'react';

// TODO: move to some common package
export enum Language {
  UNRECOGNIZED = 'unknown',
  ENGLISH = 'en',
  SPANISH = 'es',
  GERMAN = 'de',
  FRENCH = 'fr',
  ITALIAN = 'it',
  PORTUGUESE = 'pt',
  POLISH = 'pl',
  UKRAINIAN = 'uk',
  CZECH = 'cs',
  SLOVAK = 'sk',
  HUNGARIAN = 'hu',
  DUTCH = 'nl',
  SWEDISH = 'sv',
  NORWEGIAN = 'no',
}

const LANGUAGE_FLAGS = {
  [Language.UNRECOGNIZED]: '🏳️',
  [Language.ENGLISH]: '🇬🇧',
  [Language.SPANISH]: '🇪🇸',
  [Language.GERMAN]: '🇩🇪',
  [Language.FRENCH]: '🇫🇷',
  [Language.ITALIAN]: '🇮🇹',
  [Language.PORTUGUESE]: '🇵🇹',
  [Language.POLISH]: '🇵🇱',
  [Language.UKRAINIAN]: '🇺🇦',
  [Language.CZECH]: '🇨🇿',
  [Language.SLOVAK]: '🇸🇰',
  [Language.HUNGARIAN]: '🇭🇺',
  [Language.DUTCH]: '🇳🇱',
  [Language.SWEDISH]: '🇸🇪',
  [Language.NORWEGIAN]: '🇳🇴',
};

const LANGUAGE_NAMES = {
  [Language.UNRECOGNIZED]: 'Unrecognized',
  [Language.ENGLISH]: 'English',
  [Language.SPANISH]: 'Spanish',
  [Language.GERMAN]: 'German',
  [Language.FRENCH]: 'French',
  [Language.ITALIAN]: 'Italian',
  [Language.PORTUGUESE]: 'Portuguese',
  [Language.POLISH]: 'Polish',
  [Language.UKRAINIAN]: 'Ukrainian',
  [Language.CZECH]: 'Czech',
  [Language.SLOVAK]: 'Slovak',
  [Language.HUNGARIAN]: 'Hungarian',
  [Language.DUTCH]: 'Dutch',
  [Language.SWEDISH]: 'Swedish',
  [Language.NORWEGIAN]: 'Norwegian',
};

export class LanguageInfo {
  static for(language: Language) {
    return {
      flag: LANGUAGE_FLAGS[language],
      name: LANGUAGE_NAMES[language],
    };
  }
}

type LanguageTagProps = {
  language: Language;
  removable?: boolean;
  onRemove?: (language: Language) => void;
};

function LanguageTag(props: LanguageTagProps) {
  const { language, removable = false, onRemove } = props;

  const flag = LANGUAGE_FLAGS[language];
  const name = LANGUAGE_NAMES[language];

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
            onRemove?.(language);
          }}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`Remove ${language}`}
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}

export default LanguageTag;
