import { db } from '@/db/drizzle';
import { languages, userLanguages } from '@/db/schema';
import { Language, languageSchema } from '@/domain/language';
import { eq } from 'drizzle-orm';

class LanguagesRepository {
  getAllLanguages = async (): Promise<Language[]> => {
    const query = await db.select().from(languages);

    return query.map((language) => languageSchema.parse(language));
  };

  getUserLanguages = async (userId: string): Promise<Language[]> => {
    const query = await db
      .select({
        code: languages.code,
        name: languages.name,
        flag: languages.flag,
      })
      .from(userLanguages)
      .innerJoin(languages, eq(userLanguages.languageCode, languages.code))
      .where(eq(userLanguages.userId, userId));

    return query.map((language) => languageSchema.parse(language));
  };
}

const languagesRepository = new LanguagesRepository();

export default languagesRepository;
