import { eq } from 'drizzle-orm';

import { Language, languageSchema } from '@/domain/language';

import { db } from '../../../drizzle';
import { languagesTable, userLanguagesTable } from '../../../drizzle/schema';

class LanguagesRepository {
  getAllLanguages = async (): Promise<Language[]> => {
    const query = await db.select().from(languagesTable);

    return query.map((language) => languageSchema.parse(language));
  };

  getUserLanguages = async (userId: string): Promise<Language[]> => {
    const query = await db
      .select({
        code: languagesTable.code,
        name: languagesTable.name,
        flag: languagesTable.flag,
      })
      .from(userLanguagesTable)
      .innerJoin(
        languagesTable,
        eq(userLanguagesTable.languageCode, languagesTable.code),
      )
      .where(eq(userLanguagesTable.userId, userId));

    return query.map((language) => languageSchema.parse(language));
  };
}

const languagesRepository = new LanguagesRepository();

export default languagesRepository;
