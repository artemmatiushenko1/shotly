import {
  PhotographerSearchResult,
  SearchParams,
} from '@/entities/models/search';

export interface IPhotographerSearchService {
  search(params: SearchParams): Promise<PhotographerSearchResult[]>;
}
