import { Button } from '@shotly/ui/components/button';
import { TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Collection } from '@/domain/collection';
import SettingsTabLayout from './settings-tab-layout';

type DangerZoneSettingsProps = {
  collection: Collection;
};

function DangerZoneSettings(props: DangerZoneSettingsProps) {
  const { collection } = props;

  const t = useTranslations('portfolio.collectionDetails.settings');

  return (
    <SettingsTabLayout
      title={t('tabs.dangerZone.title')}
      caption={t('tabs.dangerZone.caption')}
    >
      <Button variant="destructive">
        <TrashIcon />{' '}
        {t('tabs.dangerZone.deleteButton', { name: collection.name })}
      </Button>
    </SettingsTabLayout>
  );
}

export default DangerZoneSettings;
