import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from 'pg-pool';

import { serverEnv } from '@/env/server';

import { schema } from './schema';

config({ path: '.env' });

const pool = new Pool({
  connectionString: serverEnv.DATABASE_URL,
  max: 20,
});

export const db = drizzle(pool, { logger: true, schema });
