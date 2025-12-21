import { Locale } from '@/_i18n/config';
import {
  PhotographerSearchResult,
  SearchParams,
} from '@/entities/models/search';

export interface IPhotographerSearchService {
  search(
    params: SearchParams,
    locale: Locale,
  ): Promise<PhotographerSearchResult[]>;
}
