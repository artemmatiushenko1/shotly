import { env } from '@/env';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from 'pg-pool';

// TODO: why do we need it? Is it for migrations?
config({ path: '.env' });

const pool = new Pool({
  connectionString: env.database.url,
  max: 20,
});

export const db = drizzle(pool, { logger: true });
