'use client';

import CoverUpload from '../../../../_components/cover-upload/cover-upload';
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
import React, { useActionState, useEffect, useId, useState } from 'react';
import { Button } from '@shotly/ui/components/button';
import { FeaturesInput } from './features-input';
import { Category } from '@/domain/category';
import { createServiceAction, updateServiceAction } from './actions';
import { useTranslations } from 'next-intl';
import { VisibilityStatus } from '@/domain/common';
import { toast } from '@shotly/ui/components/sonner';
import { Service } from '@/domain/service';

enum FormField {
  NAME = 'name',
  COVER_IMAGE = 'coverImageUrl',
  DESCRIPTION = 'description',
  CATEGORY_ID = 'categoryId',
  PRICE = 'price',
  FEATURES = 'features',
  DELIVERY_TIME_IN_DAYS = 'deliveryTimeInDays',
  STATUS = 'visibilityStatus',
  SERVICE_ID = 'serviceId',
}

// TODO: idea is to add list of features,
// user can select which ones are included in base price, and what might be included additionally
type CreateServiceFormProps = {
  categories: Category[];
  defaultValues?: Service;

  onSuccess: () => void;
  onCancel: () => void;
};

function CreateServiceForm(props: CreateServiceFormProps) {
  const { categories, defaultValues, onCancel, onSuccess } = props;

  const nameId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const featuresId = useId();
  const deliveryTimeId = useId();

  const t = useTranslations('services.createServiceDialog.form');

  const [createState, createServiceFormAction, isCreatePending] =
    useActionState(createServiceAction, {
      hasErrors: false,
      success: false,
      inputs: undefined,
      validationErrors: undefined,
      serviceName: '',
    });

  const [editState, editServiceFormAction, isEditPending] = useActionState(
    updateServiceAction,
    {
      hasErrors: false,
      success: false,
      inputs: undefined,
      validationErrors: undefined,
      serviceName: '',
    },
  );

  useEffect(() => {
    if (createState.success) {
      onSuccess();
      toast.success(`Service ${createState.serviceName} created successfully!`);
    }
  }, [createState.success, onSuccess, createState.serviceName]);

  useEffect(() => {
    if (editState.success) {
      onSuccess();
      toast.success(`Service ${editState.serviceName} updated successfully!`);
    }
  }, [editState.success, onSuccess, editState.serviceName]);

  const { validationErrors } = defaultValues ? editState : createState;

  const [features, setFeatures] = useState<string[]>(
    defaultValues?.features ?? [],
  );

  const [categoryId, setCategoryId] = useState<string>(
    defaultValues?.categoryId ?? '',
  );
  const [visibilityStatus, setVisibilityStatus] = useState<VisibilityStatus>(
    defaultValues?.visibilityStatus ?? VisibilityStatus.PRIVATE,
  );

  const isEditMode = !!defaultValues;

  const formAction = isEditMode
    ? editServiceFormAction
    : createServiceFormAction;

  const formPending = isEditMode ? isEditPending : isCreatePending;

  const formInputs = isEditMode ? editState.inputs : createState.inputs;

  return (
    <form className="space-y-5" action={formAction}>
      <div className="grid gap-3">
        <Label htmlFor={nameId}>{t('fields.name.label')}</Label>
        <Input
          required
          id={nameId}
          name={FormField.NAME}
          defaultValue={formInputs?.name ?? defaultValues?.name ?? ''}
          placeholder={t('fields.name.placeholder')}
          error={validationErrors?.fieldErrors.name?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label>{t('fields.coverImage.label')}</Label>
        <CoverUpload
          name={FormField.COVER_IMAGE}
          existingImageUrl={
            formInputs?.coverImageUrl ?? defaultValues?.coverImageUrl
          }
          error={validationErrors?.fieldErrors.coverImageUrl?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>{t('fields.description.label')}</Label>
        <Textarea
          showCharsCount
          name={FormField.DESCRIPTION}
          id={descriptionId}
          maxChars={500}
          placeholder={t('fields.description.placeholder')}
          defaultValue={
            formInputs?.description ?? defaultValues?.description ?? ''
          }
          error={validationErrors?.fieldErrors.description?.toString() ?? ''}
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
          {validationErrors?.fieldErrors.categoryId?.toString() && (
            // TODO: create common component for this form error
            <div className="text-sm text-destructive mt-2">
              {validationErrors?.fieldErrors.categoryId?.toString()}
            </div>
          )}
          <input
            type="hidden"
            name={FormField.CATEGORY_ID}
            value={categoryId}
          />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor={priceId}>{t('fields.price.label')}</Label>
          <Input
            required
            type="number"
            placeholder={t('fields.price.placeholder')}
            name={FormField.PRICE}
            id={priceId}
            defaultValue={
              formInputs?.price?.toString() ??
              defaultValues?.price?.toString() ??
              ''
            }
            error={validationErrors?.fieldErrors.price?.toString()}
          />
        </div>
      </div>
      <FeaturesInput
        id={featuresId}
        label={t('fields.features.label')}
        placeholder={t('fields.features.placeholder')}
        error={validationErrors?.fieldErrors.features?.toString()}
        name={FormField.FEATURES}
        value={features}
        onChange={setFeatures}
      />
      <div className="grid gap-3 w-full">
        <Label htmlFor={deliveryTimeId}>{t('fields.deliveryTime.label')}</Label>
        <Input
          required
          min={1}
          type="number"
          id={deliveryTimeId}
          name={FormField.DELIVERY_TIME_IN_DAYS}
          placeholder={t('fields.deliveryTime.placeholder')}
          defaultValue={
            formInputs?.deliveryTimeInDays?.toString() ??
            defaultValues?.deliveryTimeInDays?.toString() ??
            ''
          }
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
        <input type="hidden" name={FormField.STATUS} value={visibilityStatus} />
      </div>
      <input
        type="hidden"
        name={FormField.SERVICE_ID}
        value={defaultValues?.id}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        <Button
          disabled={formPending}
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          {t('actions.cancel')}
        </Button>
        <Button type="submit" loading={formPending}>
          {isEditMode ? t('actions.saveChanges') : t('actions.create')}
        </Button>
      </div>
    </form>
  );
}

export default CreateServiceForm;
