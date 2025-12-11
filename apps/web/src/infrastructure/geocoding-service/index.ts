import { clientEnv } from '@/env/client';

import { NovaPostGeocodingService } from './nova-post-geocoding.service';

const geocodingService = new NovaPostGeocodingService(
  clientEnv.NEXT_PUBLIC_NOVA_POST_API_URL,
  clientEnv.NEXT_PUBLIC_NOVA_POST_API_KEY,
);

export { geocodingService };
