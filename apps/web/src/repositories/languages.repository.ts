import { db } from '@/db/drizzle';
import { languages } from '@/db/schema';
import { Language, languageSchema } from '@/domain/language';

class LanguagesRepository {
  getAllLanguages = async (): Promise<Language[]> => {
    const query = await db.select().from(languages);

    return query.map((language) => languageSchema.parse(language));
  };
}

const languagesRepository = new LanguagesRepository();

export default languagesRepository;
