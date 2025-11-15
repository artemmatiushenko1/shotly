import { drizzle } from 'drizzle-orm/node-postgres';
import {
  accountsTable,
  categoriesTable,
  languagesTable,
  usersTable,
} from './schema';
import { Pool } from 'pg';
import { config } from 'dotenv';
import {
  PHOTOGRAPHER_EMAIL,
  PHOTOGRAPHER_PASSWORD,
} from '../../tests/constants';
import { hashPassword } from 'better-auth/crypto';

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

  await db
    .insert(categoriesTable)
    .values([
      { name: 'Wedding' },
      { name: 'Portrait' },
      { name: 'Event' },
      { name: 'Love Story' },
      { name: 'Family' },
      { name: 'Reportage' },
      { name: 'Commercial' },
      { name: 'Fashion' },
      { name: 'Architecture' },
      { name: 'Content' },
      { name: 'Other' },
    ])
    .onConflictDoNothing();

  // TODO: we should run e2e on a clean test db
  // it would be perfect to run each test with a separate account
  const [user] = await db
    .insert(usersTable)
    .values({
      id: crypto.randomUUID(),
      name: 'John Doe',
      email: PHOTOGRAPHER_EMAIL,
      emailVerified: true,
    })
    .returning()
    .onConflictDoNothing();

  if (!user) {
    throw Error('User was not created!');
  }

  await db.insert(accountsTable).values({
    id: crypto.randomUUID(),
    accountId: crypto.randomUUID(),
    password: await hashPassword(PHOTOGRAPHER_PASSWORD),
    userId: user?.id ?? '',
    providerId: 'credential',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

main();
