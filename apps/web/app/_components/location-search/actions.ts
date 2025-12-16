'use server';

import { geocodingService } from '@/infrastructure/services/geocoding-service';

const searchLocationsAction = async (searchString: string) => {
  const response =
    await geocodingService.searchUkrainianSettlementByName(searchString);
  return response;
};

export { searchLocationsAction };
