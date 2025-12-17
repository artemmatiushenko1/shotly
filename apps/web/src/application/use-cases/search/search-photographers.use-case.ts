import { SearchParams } from '@/entities/models/search';
import { photographerSearchService } from '@/infrastructure/services/search';

export const searchPhotographersUseCase = async (
  searchParams: SearchParams,
) => {
  const results = await photographerSearchService.search(searchParams);
  return results;
};
