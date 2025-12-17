'use server';

import { searchPhotographersUseCase } from '@/application/use-cases/search';
import { SearchParams, searchParamsSchema } from '@/entities/models/search';
import { validatedFormAction } from '@/utils/server-actions';

export const searchPhotographersAction = async (rawParams: SearchParams) =>
  validatedFormAction(searchParamsSchema, rawParams, async (searchParams) => {
    const searchResults = await searchPhotographersUseCase(searchParams);

    return {
      status: 'success',
      message: 'Search photographers successful',
      response: searchResults,
    };
  });
