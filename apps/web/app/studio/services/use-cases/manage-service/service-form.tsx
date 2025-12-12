'use client';

import { ClockIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useActionState, useEffect, useId, useState } from 'react';

import { Category } from '@/entities/models/category';
import { VisibilityStatus } from '@/entities/models/common';

import { Button } from '@shotly/ui/components/button';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { toast } from '@shotly/ui/components/sonner';
import { Switch } from '@shotly/ui/components/switch';
import { Textarea } from '@shotly/ui/components/textarea';

import CoverUpload from '../../../../_components/cover-upload/cover-upload';
import { FeaturesInput } from './features-input';
import {
  DESCRIPTION_MAX_LENGTH,
  ServiceFormState,
  ServiceFormValues,
} from './service-form.schema';

type CreateServiceFormProps = {
  categories: Category[];
  defaultValues?: Partial<ServiceFormValues>;
  submitLabel: string;
  action: (
    state: ServiceFormState,
    payload: FormData,
  ) => Promise<ServiceFormState>;
  onSuccess: () => void;
  onCancel: () => void;
};

const INITIAL_STATE: ServiceFormState = {
  status: 'idle',
  message: '',
};

function CreateServiceForm(props: CreateServiceFormProps) {
  const {
    categories,
    defaultValues,
    onCancel,
    onSuccess,
    action,
    submitLabel,
  } = props;

  const nameId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const featuresId = useId();
  const deliveryTimeId = useId();

  const t = useTranslations('services.createServiceDialog.form');

  const [state, formAction, isPending] = useActionState(action, INITIAL_STATE);

  const values = { ...defaultValues, ...state.inputs };

  const [features, setFeatures] = useState<string[]>(values.features ?? []);

  const [categoryId, setCategoryId] = useState<string>(
    defaultValues?.categoryId ?? '',
  );
  const [visibilityStatus, setVisibilityStatus] = useState<VisibilityStatus>(
    defaultValues?.visibilityStatus ?? VisibilityStatus.PRIVATE,
  );

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      onSuccess();
    }

    if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state.status, state.message, onSuccess]);

  const errors = state.errors ?? {};

  return (
    <form className="space-y-5" action={formAction}>
      <div className="grid gap-3">
        <Label htmlFor={nameId}>{t('fields.name.label')}</Label>
        <Input
          required
          id={nameId}
          name="name"
          defaultValue={values.name}
          placeholder={t('fields.name.placeholder')}
          error={errors?.name?.join(', ')}
        />
      </div>
      <div className="grid gap-3">
        <Label>{t('fields.coverImage.label')}</Label>
        <CoverUpload
          name="coverImageUrl"
          existingImageUrl={values.coverImageUrl}
          error={errors?.coverImageUrl?.join(', ')}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>{t('fields.description.label')}</Label>
        <Textarea
          showCharsCount
          name="description"
          id={descriptionId}
          maxChars={DESCRIPTION_MAX_LENGTH}
          placeholder={t('fields.description.placeholder')}
          defaultValue={values.description}
          error={errors?.description?.join(', ')}
        />
      </div>
      <div className="flex space-x-3 items-start">
        <div className="grid gap-3 w-full">
          <Label htmlFor="username-1">{t('fields.category.label')}</Label>
          {/* TODO: add error style for select */}
          <Select required value={categoryId} onValueChange={setCategoryId}>
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
          {errors?.categoryId?.length && (
            // TODO: create common component for this form error
            <div className="text-sm text-destructive mt-2">
              {errors?.categoryId?.join(', ')}
            </div>
          )}
          <input type="hidden" name="categoryId" value={categoryId} />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor={priceId}>
            {t('fields.price.label')}{' '}
            <span className="text-xs text-muted-foreground leading-0">
              /{t('fields.price.timeUnit')}
            </span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              UAH
            </span>
            <Input
              required
              type="number"
              className="pl-12"
              placeholder={t('fields.price.placeholder')}
              name="price"
              id={priceId}
              defaultValue={values.price?.toString()}
              error={errors?.price?.join(', ')}
            />
          </div>
        </div>
      </div>
      <FeaturesInput
        id={featuresId}
        label={t('fields.features.label')}
        placeholder={t('fields.features.placeholder')}
        error={errors?.features?.join(', ')}
        name="features"
        value={features}
        onChange={setFeatures}
      />
      <div className="grid gap-3 w-full">
        <Label htmlFor={deliveryTimeId}>{t('fields.deliveryTime.label')}</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            <ClockIcon className="w-4 h-4" />
          </span>
          <Input
            required
            min={1}
            type="number"
            className="pl-9"
            id={deliveryTimeId}
            name="deliveryTimeInDays"
            placeholder={t('fields.deliveryTime.placeholder')}
            defaultValue={values.deliveryTimeInDays?.toString()}
            error={errors?.deliveryTimeInDays?.join(', ')}
          />
        </div>
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
        <input type="hidden" name="visibilityStatus" value={visibilityStatus} />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        <Button
          disabled={isPending}
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          {t('actions.cancel')}
        </Button>
        <Button type="submit" loading={isPending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default CreateServiceForm;
