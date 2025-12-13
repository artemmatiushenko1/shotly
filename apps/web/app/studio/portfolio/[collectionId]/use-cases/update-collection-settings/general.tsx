import { useTranslations } from 'next-intl';

import { Category } from '@/entities/models/category';
import { Collection } from '@/entities/models/collection';

import ManageCollectionForm from '../../../_ui/manage-collection-form/manage-collection-form';
import { updateCollectionAction } from './actions';
import SettingsTabLayout from './settings-tab-layout';

type GeneralCollectionSettingsProps = {
  collection: Collection;
  categories: Category[];
};

function GeneralCollectionSettings(props: GeneralCollectionSettingsProps) {
  const { collection, categories } = props;

  const t = useTranslations('portfolio.collectionDetails.settings');

  const action = updateCollectionAction.bind(null, collection.id);

  return (
    <SettingsTabLayout
      title={t('tabs.general.title')}
      caption={t('tabs.general.caption')}
    >
      <ManageCollectionForm
        defaultValues={collection}
        className="flex-1"
        categories={categories}
        submitLabel={t('tabs.general.saveButton')}
        showCancelButton={false}
        action={action}
      />
    </SettingsTabLayout>
  );
}

export default GeneralCollectionSettings;
