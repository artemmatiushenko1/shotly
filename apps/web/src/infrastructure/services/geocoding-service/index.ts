import { serverEnv } from '@/env/server';

import { NovaPostGeocodingService } from './nova-post-geocoding.service';

const geocodingService = new NovaPostGeocodingService(
  serverEnv.NOVA_POST_API_URL,
  serverEnv.NOVA_POST_API_KEY,
);

export { geocodingService };
