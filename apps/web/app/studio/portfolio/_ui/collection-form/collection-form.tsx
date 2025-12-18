'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useActionState, useEffect, useId, useState } from 'react';

import { COLLECTION_DESCRIPTION_MAX_LENGTH } from '@/application/use-cases/portfolio/constants';
import { Category } from '@/entities/models/category';
import { Collection } from '@/entities/models/collection';
import { FormActionState } from '@/utils/server-actions';

import { Button } from '@shotly/ui/components/button';
import { DatePicker } from '@shotly/ui/components/date-picker';
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
import { Textarea } from '@shotly/ui/components/textarea';
import { cn } from '@shotly/ui/lib/utils';

import { CollectionFormValues } from './collection-form.schema';

type CollectionFormProps = {
  defaultValues?: Collection;
  className?: string;
  categories: Category[];
  showCancelButton?: boolean;
  onCancel?: () => void;
  submitLabel: string;
  action: (
    prevState: FormActionState<CollectionFormValues>,
    formData: FormData,
  ) => Promise<FormActionState<CollectionFormValues>>;
};

function CollectionForm(props: CollectionFormProps) {
  const {
    defaultValues,
    categories,
    showCancelButton = true,
    onCancel,
    className,
    submitLabel,
    action,
  } = props;
  const locale = useLocale();

  const t = useTranslations('portfolio.createCollectionDialog.form');

  const [state, formAction, pending] = useActionState(action, {
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
    }
  }, [state.status, state.message]);

  const { errors, inputs } = state;

  const [shootDate, setShootDate] = useState<Date | undefined>(
    defaultValues?.shootDate,
  );
  const [categoryId, setCategoryId] = useState<string>(
    defaultValues?.category.id ?? '',
  );

  const nameId = useId();
  const descriptionId = useId();
  const categoryIdInputId = useId();
  const shootDateId = useId();

  const values = { ...defaultValues, ...inputs };

  const formatDateValue = (date: Date | undefined) => {
    // Format date as YYYY-MM-DD string
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <form
      action={formAction}
      className={cn('space-y-5 flex flex-col', className)}
    >
      <div className="grid gap-3">
        <Label htmlFor={nameId}>{t('fields.name.label')}</Label>
        <Input
          id={nameId}
          name="name"
          placeholder={t('fields.name.placeholder')}
          defaultValue={values.name}
          error={errors?.name?.join(', ')}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>{t('fields.description.label')}</Label>
        <Textarea
          id={descriptionId}
          name="description"
          showCharsCount
          maxChars={COLLECTION_DESCRIPTION_MAX_LENGTH}
          placeholder={t('fields.description.placeholder')}
          defaultValue={values.description ?? undefined}
          error={errors?.description?.join(', ')}
        />
      </div>
      <div className="flex space-x-3 items-start">
        <div className="grid gap-3 w-full">
          <Label htmlFor={categoryIdInputId}>
            {t('fields.category.label')}
          </Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full" id={categoryIdInputId}>
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
          {errors?.categoryId?.join(', ') && (
            <div className="text-sm text-destructive mt-2">
              {errors?.categoryId?.join(', ')}
            </div>
          )}
          <input type="hidden" name="categoryId" value={categoryId} />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor={shootDateId}>{t('fields.shootDate.label')}</Label>
          {/* TODO: disable future dates */}
          <DatePicker
            id={shootDateId}
            value={shootDate}
            onChange={setShootDate}
            placeholder={t('fields.shootDate.placeholder')}
            error={errors?.shootDate?.join(', ')}
            startMonth={new Date(2000, 0)}
            endMonth={new Date(new Date().getFullYear(), 11)}
            locale={{ code: locale }}
          />
          <input
            type="hidden"
            name="shootDate"
            value={formatDateValue(shootDate)}
          />
          {/* TODO: add tags input */}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        {showCancelButton && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        )}
        <Button type="submit" loading={pending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default CollectionForm;
