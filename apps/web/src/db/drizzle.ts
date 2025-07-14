import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import Pool from 'pg-pool';

config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
});

export const db = drizzle(pool, { logger: true });
