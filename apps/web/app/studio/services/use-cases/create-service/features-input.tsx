'use client';

import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';
import { Button } from '@shotly/ui/components/button';
import { Badge } from '@shotly/ui/components/badge';
import { PlusCircleIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

type FeaturesInputProps = {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  name: string;
  value: string[];
  onChange: (features: string[]) => void;
};

export function FeaturesInput(props: FeaturesInputProps) {
  const { id, label, placeholder, error, name, value, onChange } = props;

  const [feature, setFeature] = useState('');

  const handleAddFeature = () => {
    const normalizedFeature = feature.trim();

    if (value.includes(normalizedFeature)) {
      setFeature('');
      return;
    }

    onChange([...value, normalizedFeature]);
    setFeature('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeature(e.target.value);
  };

  const handleRemoveFeature = (feature: string) => {
    onChange(value.filter((f) => f !== feature));
  };

  return (
    <div className="grid gap-3 w-full">
      <Label htmlFor={id}>{label}</Label>
      {/* TODO: Specify UX friendly description for this field (what are features etc.) */}
      <div className="w-full flex gap-3">
        <Input
          id={id}
          value={feature}
          className="flex-1"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          error={error}
        />
        <Button type="button" onClick={handleAddFeature}>
          <PlusCircleIcon />
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {value.map((feature) => (
          <Badge key={feature} variant="secondary">
            {feature}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-4"
              onClick={() => handleRemoveFeature(feature)}
            >
              <XIcon />
            </Button>
          </Badge>
        ))}
      </div>
      <input type="hidden" name={name} value={value.join(',')} />
    </div>
  );
}
