import { LocationDetails } from '@/entities/models/locations';

export interface IGeocodingService {
  searchUkrainianSettlementByName: (name: string) => Promise<LocationDetails[]>;
}
