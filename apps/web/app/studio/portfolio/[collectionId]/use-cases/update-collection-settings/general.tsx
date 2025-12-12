import { useTranslations } from 'next-intl';

import { Category } from '@/entities/models/category';
import { Collection } from '@/entities/models/collection';

import CreateCollectionForm from '../../../use-cases/create-collection/create-collection-form';
import SettingsTabLayout from './settings-tab-layout';

type GeneralCollectionSettingsProps = {
  collection: Collection;
  categories: Category[];
};

function GeneralCollectionSettings(props: GeneralCollectionSettingsProps) {
  const { collection, categories } = props;

  const t = useTranslations('portfolio.collectionDetails.settings');

  return (
    <SettingsTabLayout
      title={t('tabs.general.title')}
      caption={t('tabs.general.caption')}
    >
      <CreateCollectionForm
        defaultValues={collection}
        className="flex-1"
        categories={categories}
        submitButtonText={t('tabs.general.saveButton')}
        showCancelButton={false}
      />
    </SettingsTabLayout>
  );
}

export default GeneralCollectionSettings;
