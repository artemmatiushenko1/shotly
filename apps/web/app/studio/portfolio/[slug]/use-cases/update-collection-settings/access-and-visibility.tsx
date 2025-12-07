'use client';

import { useTranslations } from 'next-intl';
import { startTransition, useId, useOptimistic, useState } from 'react';

import { VisibilityStatus, visibilityStatusSchema } from '@/domain/common';

import { Label } from '@shotly/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@shotly/ui/components/radio-group';
import { toast } from '@shotly/ui/components/sonner';

import { changeCollectionVisibilityStatusAction } from './actions';
import { useCollectionSettingsLoading } from './loading.context';
import SettingsTabLayout from './settings-tab-layout';

type AccessAndVisibilitySettingsProps = {
  defaultVisibility: VisibilityStatus;
  collectionId: string;
};

function AccessAndVisibilitySettings(props: AccessAndVisibilitySettingsProps) {
  const { defaultVisibility, collectionId } = props;

  const { loading, setLoading } = useCollectionSettingsLoading();

  const [visibility, setVisibility] = useState(defaultVisibility);
  const [optimisticVisibility, dispatchOptimisticVisibility] = useOptimistic<
    VisibilityStatus,
    VisibilityStatus
  >(defaultVisibility, (_, newVisibility) => newVisibility);

  const t = useTranslations('portfolio.collectionDetails.settings');

  const publicId = useId();
  const privateId = useId();

  const handleVisibilityChange = async (value: VisibilityStatus) => {
    setLoading(true);

    startTransition(() => {
      dispatchOptimisticVisibility(value);

      changeCollectionVisibilityStatusAction(collectionId, value)
        .then(() => {
          setVisibility(value);
          toast.success(`Collection privacy updated to ${value}`);
        })
        .catch(() => {
          dispatchOptimisticVisibility(visibility);
          toast.error('Failed to update collection privacy');
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <SettingsTabLayout
      title={t('tabs.visibility.title')}
      caption={t('tabs.visibility.caption')}
    >
      <RadioGroup
        disabled={loading}
        value={optimisticVisibility}
        onValueChange={async (value) =>
          handleVisibilityChange(visibilityStatusSchema.parse(value))
        }
      >
        <div className="flex gap-2">
          <RadioGroupItem value={VisibilityStatus.PUBLIC} id={publicId} />
          <div className="grid flex-1 space-y-2">
            <Label htmlFor={publicId}>
              {t('tabs.visibility.public.label')}
            </Label>
            <p className="text-muted-foreground text-xs">
              {t('tabs.visibility.public.description')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <RadioGroupItem value={VisibilityStatus.PRIVATE} id={privateId} />
          <div className="grid flex-1 space-y-2">
            <Label htmlFor={privateId}>
              {t('tabs.visibility.private.label')}
            </Label>
            <p className="text-muted-foreground text-xs">
              {t('tabs.visibility.private.description')}
            </p>
          </div>
        </div>
      </RadioGroup>
    </SettingsTabLayout>
  );
}

export default AccessAndVisibilitySettings;
