import { TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition } from 'react';

import { Collection } from '@/entities/models/collection';

import { Button } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';

import { deleteCollectionAction } from './actions';
import { useCollectionSettingsLoading } from './loading.context';
import SettingsTabLayout from './settings-tab-layout';

type DangerZoneSettingsProps = {
  collection: Collection;
};

function DangerZoneSettings(props: DangerZoneSettingsProps) {
  const { collection } = props;

  const t = useTranslations('portfolio.collectionDetails.settings');

  const { setLoading, loading } = useCollectionSettingsLoading();

  const handleDeleteCollection = async () => {
    setLoading(true);

    startTransition(async () => {
      await deleteCollectionAction(collection.id);
      setLoading(false);
    });
  };

  return (
    <SettingsTabLayout
      title={t('tabs.dangerZone.title')}
      caption={t('tabs.dangerZone.caption')}
    >
      <ConfirmationDialog
        onConfirm={handleDeleteCollection}
        title={t('tabs.dangerZone.confirmDialog.title')}
        actionSeverity="danger"
        confirmLabel={t('tabs.dangerZone.confirmDialog.confirmLabel')}
        cancelLabel={t('tabs.dangerZone.confirmDialog.cancelLabel')}
        description={t('tabs.dangerZone.confirmDialog.description')}
        icon={<TrashIcon />}
      >
        <Button variant="destructive" disabled={loading}>
          <TrashIcon />{' '}
          {t('tabs.dangerZone.deleteButton', { name: collection.name })}
        </Button>
      </ConfirmationDialog>
    </SettingsTabLayout>
  );
}

export default DangerZoneSettings;
