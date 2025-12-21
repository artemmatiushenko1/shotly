import { Locale } from '@/_i18n/config';
import { SearchParams } from '@/entities/models/search';
import { photographerSearchService } from '@/infrastructure/services/search';

export const searchPhotographersUseCase = async (
  searchParams: SearchParams,
  locale: Locale,
) => {
  const results = await photographerSearchService.search(searchParams, locale);
  return results;
};
