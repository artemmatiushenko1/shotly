'use server';

import { getLocale } from '@/_i18n/locale';
import { searchPhotographersUseCase } from '@/application/use-cases/search';
import { SearchParams, searchParamsSchema } from '@/entities/models/search';
import { validatedFormAction } from '@/utils/server-actions';

export const searchPhotographersAction = async (rawParams: SearchParams) =>
  validatedFormAction(searchParamsSchema, rawParams, async (searchParams) => {
    const locale = await getLocale();
    const searchResults = await searchPhotographersUseCase(
      searchParams,
      locale,
    );

    return {
      status: 'success',
      message: 'Search photographers successful',
      response: searchResults,
    };
  });
