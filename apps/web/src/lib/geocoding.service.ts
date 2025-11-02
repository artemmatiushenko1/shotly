import { LocationDetails, locationDetailsSchema } from '@/domain/locations';
import { clientEnv } from '@/env/client';
import { z } from 'zod';

const NovaSettlementSchema = z.object({
  Ref: z.string(),
  Description: z.string(), // settlement name (UA)
  SettlementTypeDescription: z.string().optional(),
  RegionsDescription: z.string().optional().default(''), // district/raion
  AreaDescription: z.string().optional().default(''), // oblast
  Latitude: z.coerce.string().default('0'),
  Longitude: z.coerce.string().default('0'),
});

const NovaBaseResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(NovaSettlementSchema),
});

const mapSettlementToLocationDetails = (
  item: z.infer<typeof NovaSettlementSchema>,
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

export interface IGeocodingService {
  searchLocationByName: (name: string) => Promise<LocationDetails[]>;
}

export class GeocodingService implements IGeocodingService {
  private static readonly URL = 'https://api.novaposhta.ua/v2.0/json/';
  constructor() {}

  async searchLocationByName(name: string): Promise<LocationDetails[]> {
    const key = (name || '').trim();
    if (!key) throw new Error('Name must be a non-empty string');

    const body = {
      apiKey: clientEnv.NEXT_PUBLIC_NOVA_POST_API_KEY,
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
      resp = await fetch(GeocodingService.URL, {
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

    return data.data.map(mapSettlementToLocationDetails);
  }
}
