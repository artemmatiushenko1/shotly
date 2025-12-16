import { getTranslations } from 'next-intl/server';

import { getAllCategoriesUseCase } from '@/application/use-cases/categories';
import { getAllLanguagesUseCase } from '@/application/use-cases/languages';

import SearchView from './search-view';

async function SearchPage() {
  const t = await getTranslations('landing.searchPage');
  const categories = await getAllCategoriesUseCase();
  const languages = await getAllLanguagesUseCase();

  // TODO: get initial search results server side

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-4">{t('description')}</p>
      <SearchView categories={categories} languages={languages} />
    </div>
  );
}

export default SearchPage;
