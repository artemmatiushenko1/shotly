'use client';

import CoverUpload from '@/components/cover-upload/cover-upload';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';
import { Switch } from '@shotly/ui/components/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { Textarea } from '@shotly/ui/components/textarea';
import React, { useActionState, useId, useState } from 'react';
import { Button } from '@shotly/ui/components/button';
import { PlusCircleIcon } from 'lucide-react';
import { Badge } from '@shotly/ui/components/badge';
import { Category } from '@/domain/category';
import { createService } from './actions';
import { useTranslations } from 'next-intl';
import { VisibilityStatus } from '@/domain/common';

enum FormField {
  NAME = 'name',
  COVER_IMAGE = 'coverImage',
  DESCRIPTION = 'description',
  CATEGORY_ID = 'categoryId',
  PRICE = 'price',
  FEATURES = 'features',
  DELIVERY_TIME_IN_DAYS = 'deliveryTimeInDays',
  STATUS = 'status',
}

// TODO: idea is to add list of features,
// user can select which ones are included in base price, and what might be included additionally
type CreateServiceFormProps = {
  categories: Category[];
  onCancel: () => void;
};

function CreateServiceForm(props: CreateServiceFormProps) {
  const { categories, onCancel } = props;
  const t = useTranslations('services.createServiceDialog.form');

  const [state, formAction, pending] = useActionState(createService, {
    hasErrors: false,
    validationErrors: undefined,
  });

  const { validationErrors } = state;

  const [features, setFeatures] = useState<string[]>([]);
  const [feature, setfeature] = useState('');

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [visibilityStatus, setVisibilityStatus] = useState<VisibilityStatus>(
    VisibilityStatus.PRIVATE,
  );

  const nameId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const featuresId = useId();
  const deliveryTimeId = useId();

  return (
    <form className="space-y-5" action={formAction}>
      <div className="grid gap-3">
        <Label htmlFor={nameId}>
          {t('fields.name.label')} <span className="text-destructive">*</span>
        </Label>
        <Input
          id={nameId}
          name={FormField.NAME}
          placeholder={t('fields.name.placeholder')}
          error={validationErrors?.fieldErrors.name?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label>
          {t('fields.coverImage.label')}{' '}
          <span className="text-destructive">*</span>
        </Label>
        <CoverUpload
          name={FormField.COVER_IMAGE}
          error={validationErrors?.fieldErrors.coverImage?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>
          {t('fields.description.label')}{' '}
          <span className="text-xs text-muted-foreground">
            ({t('fields.description.optional')})
          </span>
        </Label>
        <Textarea
          showCharsCount
          name={FormField.DESCRIPTION}
          id={descriptionId}
          maxChars={500}
          placeholder={t('fields.description.placeholder')}
          error={validationErrors?.fieldErrors.description?.toString() ?? ''}
        />
      </div>
      <div className="flex space-x-3 items-start">
        <div className="grid gap-3 w-full">
          <Label htmlFor="username-1">{t('fields.category.label')}</Label>
          <Select value={categoryId ?? undefined} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('fields.category.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t('fields.category.groupLabel')}</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {validationErrors?.fieldErrors.categoryId?.toString() && (
            // TODO: create common component for this form error
            <div className="text-sm text-destructive mt-2">
              {validationErrors?.fieldErrors.categoryId?.toString()}
            </div>
          )}
          <input
            type="hidden"
            name={FormField.CATEGORY_ID}
            value={categoryId ?? undefined}
          />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor={priceId}>{t('fields.price.label')}</Label>
          <Input
            placeholder={t('fields.price.placeholder')}
            name={FormField.PRICE}
            id={priceId}
            error={validationErrors?.fieldErrors.price?.toString()}
          />
        </div>
      </div>
      <div className="grid gap-3 w-full">
        <Label htmlFor={featuresId}>{t('fields.features.label')}</Label>
        {/* TODO: Specify UX friendly description for this field (what are features etc.) */}
        <div className="w-full flex gap-3">
          <Input
            placeholder={t('fields.features.placeholder')}
            value={feature}
            onChange={(e) => setfeature(e.target.value)}
            id={featuresId}
            className="flex-1"
            error={validationErrors?.fieldErrors.features?.toString()}
          />
          <Button
            type="button"
            onClick={() => setFeatures((prev) => [...prev, feature])}
          >
            <PlusCircleIcon />
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {features.map((feature) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
        <input
          type="hidden"
          name={FormField.FEATURES}
          value={features.join(',')}
        />
      </div>
      <div className="grid gap-3 w-full">
        <Label htmlFor={deliveryTimeId}>{t('fields.deliveryTime.label')}</Label>
        <Input
          type="number"
          min={1}
          max={60}
          placeholder={t('fields.deliveryTime.placeholder')}
          name={FormField.DELIVERY_TIME_IN_DAYS}
          id={deliveryTimeId}
          error={validationErrors?.fieldErrors.deliveryTimeInDays?.toString()}
        />
      </div>
      <div className="w-full flex justify-between">
        <div>
          <Label htmlFor="username-1" className="mb-1">
            {t('fields.visibility.label')}
          </Label>
          <p className="text-muted-foreground text-xs">
            {t('fields.visibility.description')}
          </p>
        </div>
        <Switch
          checked={visibilityStatus === VisibilityStatus.PUBLIC}
          onCheckedChange={(checked) =>
            setVisibilityStatus(
              checked ? VisibilityStatus.PUBLIC : VisibilityStatus.PRIVATE,
            )
          }
        />
        <input type="hidden" name={FormField.STATUS} value={status} />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          {t('actions.cancel')}
        </Button>
        <Button type="submit" loading={pending}>
          {t('actions.saveChanges')}
        </Button>
      </div>
    </form>
  );
}

export default CreateServiceForm;
