import { LocationDetails } from '@/domain/locations';

export interface IGeocodingService {
  searchUkrainianSettlementByName: (name: string) => Promise<LocationDetails[]>;
}
