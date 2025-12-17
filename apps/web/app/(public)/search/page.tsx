import { getTranslations } from 'next-intl/server';

import { getLocale } from '@/_i18n/locale';
import { getAllCategoriesUseCase } from '@/application/use-cases/categories';
import { getAllLanguagesUseCase } from '@/application/use-cases/languages';
import { searchPhotographersUseCase } from '@/application/use-cases/search';

import { DEFAULT_SEARCH_PARAMS } from './constants';
import SearchView from './search-view';
import { parseSearchParams } from './utils';

type SearchPageProps = {
  searchParams: Promise<Record<string, string> | undefined>;
};

async function SearchPage(props: SearchPageProps) {
  const rawSearchParams = await props.searchParams;
  const searchParams = new URLSearchParams(rawSearchParams ?? {});
  const initialSearchParams = parseSearchParams(
    searchParams,
    DEFAULT_SEARCH_PARAMS,
  );

  const t = await getTranslations('landing.searchPage');
  const locale = await getLocale();

  const [categories, languages, initialSearchResults] = await Promise.all([
    getAllCategoriesUseCase(locale),
    getAllLanguagesUseCase(locale),
    searchPhotographersUseCase(initialSearchParams),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-4">{t('description')}</p>
      <SearchView
        categories={categories}
        languages={languages}
        initialSearchParams={initialSearchParams}
        initialSearchResults={initialSearchResults}
      />
    </div>
  );
}

export default SearchPage;
