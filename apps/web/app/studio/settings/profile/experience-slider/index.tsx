'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Slider } from '@shotly/ui/components/slider';

type ExperienceSliderProps = {
  inputId?: string;
  defaultYears?: number;
  minYears?: number;
  maxYears?: number;
  name: string;
  error?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const ExperienceSlider = (props: ExperienceSliderProps) => {
  const {
    name,
    inputId,
    defaultYears = 0,
    minYears = 0,
    maxYears = 10,
    error,
  } = props;

  const t = useTranslations('settings.profile.fields.experience.slider');

  const normalizedDefault = clamp(defaultYears, minYears, maxYears);
  const [years, setYears] = useState<number>(normalizedDefault);

  const displayValue =
    years >= maxYears
      ? t('yearsPlus', { maxYears })
      : years === 0
        ? t('lessThanOneYear')
        : t('years', { count: years });

  return (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{displayValue}</span>
      </div>
      <Slider
        name={name}
        value={[years]}
        min={minYears}
        max={maxYears}
        step={1}
        onValueChange={(value) => {
          const [next] = value;
          setYears(next ?? minYears);
        }}
        aria-labelledby={inputId}
        id={inputId}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{t('minLabel', { minYears })}</span>
        <span>{t('maxLabel', { maxYears })}</span>
      </div>
      {error && <div className="text-sm text-destructive mt-2">{error}</div>}
    </div>
  );
};

export { ExperienceSlider };
