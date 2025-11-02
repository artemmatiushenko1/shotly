import { LocationDetails, locationDetailsSchema } from '@/domain/locations';
import { IGeocodingService } from '../geocoding-service.interface';
import { NovaBaseResponseSchema, NovaPostSettlement } from './nova-post.schema';

export class NovaPostGeocodingService implements IGeocodingService {
  constructor(
    private apiUrl: string,
    private apiKey: string,
  ) {}

  private mapSettlementToLocationDetails = (
    item: NovaPostSettlement,
  ): LocationDetails => {
    const parts = [
      item.Description,
      item.RegionsDescription,
      item.AreaDescription,
    ]
      .filter(Boolean)
      .join(', ');

    return locationDetailsSchema.parse({
      lat: item.Latitude,
      lon: item.Longitude,
      externalId: item.Ref,
      name: item.Description,
      displayName: parts,
      country: 'Ukraine',
    });
  };

  searchUkrainianSettlementByName = async (
    name: string,
  ): Promise<LocationDetails[]> => {
    const key = (name || '').trim();
    if (!key) throw new Error('Name must be a non-empty string');

    const body = {
      apiKey: this.apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'getSettlements',
      methodProperties: {
        FindByString: key, // UA-only search string per docs
      },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let resp: Response;
    try {
      resp = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err) {
      throw new Error(`Nova Post request failed: ${(err as Error).message}`);
    } finally {
      clearTimeout(timeout);
    }

    if (!resp.ok) throw new Error(`Nova Post service returned ${resp.status}`);

    const json = (await resp.json()) as unknown;
    const { data } = NovaBaseResponseSchema.safeParse(json);
    if (!data) return [];

    return data.data.map(this.mapSettlementToLocationDetails);
  };
}
