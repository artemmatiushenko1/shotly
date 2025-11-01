import { drizzle } from 'drizzle-orm/node-postgres';
import { languagesTable } from './schema';
import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });

const main = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 20,
  });

  const db = drizzle(pool, { logger: true });

  await db
    .insert(languagesTable)
    .values([
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸' },
      { code: 'de', name: 'German', flag: '🇩🇪' },
      { code: 'fr', name: 'French', flag: '🇫🇷' },
      { code: 'it', name: 'Italian', flag: '🇮🇹' },
      { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
      { code: 'pl', name: 'Polish', flag: '🇵🇱' },
      { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
      { code: 'cs', name: 'Czech', flag: '🇨🇿' },
      { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
      { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
      { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
      { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
      { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
    ])
    .onConflictDoNothing(); // prevents duplicates if you rerun
};

main();
