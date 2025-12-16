import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { categoriesTable, languagesTable } from './schema';

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
      { code: 'en', name: 'English', flag: '🇬🇧', nameUk: 'Англійська' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸', nameUk: 'Іспанська' },
      { code: 'de', name: 'German', flag: '🇩🇪', nameUk: 'Німецька' },
      { code: 'fr', name: 'French', flag: '🇫🇷', nameUk: 'Французька' },
      { code: 'it', name: 'Italian', flag: '🇮🇹', nameUk: 'Італійська' },
      { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nameUk: 'Португальська' },
      { code: 'pl', name: 'Polish', flag: '🇵🇱', nameUk: 'Польська' },
      { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', nameUk: 'Українська' },
      { code: 'cs', name: 'Czech', flag: '🇨🇿', nameUk: 'Чеська' },
      { code: 'sk', name: 'Slovak', flag: '🇸🇰', nameUk: 'Словацька' },
      { code: 'hu', name: 'Hungarian', flag: '🇭🇺', nameUk: 'Угорська' },
      { code: 'nl', name: 'Dutch', flag: '🇳🇱', nameUk: 'Нідерландська' },
      { code: 'sv', name: 'Swedish', flag: '🇸🇪', nameUk: 'Шведська' },
      { code: 'no', name: 'Norwegian', flag: '🇳🇴', nameUk: 'Норвезька' },
    ])
    .onConflictDoNothing(); // prevents duplicates if you rerun

  await db
    .insert(categoriesTable)
    .values([
      { name: 'Wedding', nameUk: 'Весілля' },
      { name: 'Food', nameUk: 'Їжа' },
      { name: 'Birthday', nameUk: 'День народження' },
      { name: 'Baby', nameUk: 'Дитяча зйомка' },
      { name: 'Animals', nameUk: 'Тварини' },
      { name: 'Portrait', nameUk: 'Портрет' },
      { name: 'Event', nameUk: 'Подія' },
      { name: 'Love Story', nameUk: 'Парна зйомка' },
      { name: 'Family', nameUk: "Сім'я" },
      { name: 'Reportage', nameUk: 'Репортаж' },
      { name: 'Commercial', nameUk: 'Комерційна зйомка' },
      { name: 'Fashion', nameUk: 'Мода' },
      { name: 'Architecture', nameUk: 'Архітектура' },
      { name: 'Content', nameUk: 'Контент для соціальних мереж' },
      { name: 'Other', nameUk: 'Інше' },
    ])
    .onConflictDoNothing();
};

main();
