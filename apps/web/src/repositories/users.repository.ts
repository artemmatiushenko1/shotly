import 'server-only';

import { db } from '@/db/drizzle';
import { languages, user, userLanguages } from '@/db/schema';
import {
  User,
  UserProfile,
  userProfileSchema,
  userSchema,
  UserUpdate,
} from '@/domain/user';
import { eq, inArray } from 'drizzle-orm';

class UsersRepository {
  async updateUserLanguages(userId: string, languageCodes: string[]) {
    const newLanguageRows = await db
      .select({ code: languages.code })
      .from(languages)
      .where(inArray(languages.code, languageCodes));

    const newLanguageCodes = newLanguageRows.map((l) => l.code);

    await db.delete(userLanguages).where(eq(userLanguages.userId, userId));

    if (newLanguageCodes.length > 0) {
      await db.insert(userLanguages).values(
        newLanguageCodes.map((code) => ({
          userId,
          languageCode: code,
        })),
      );
    }
  }

  async updateUser(id: string, input: Partial<UserUpdate>): Promise<User> {
    const [query] = await db
      .update(user)
      .set(input)
      .where(eq(user.id, id))
      .returning();

    return userSchema.parse(query);
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    const [userQuery] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    const languagesQuery = await db
      .select({
        code: languages.code,
        name: languages.name,
        flag: languages.flag,
      })
      .from(userLanguages)
      .innerJoin(languages, eq(userLanguages.languageCode, languages.code))
      .where(eq(userLanguages.userId, userId));

    return userProfileSchema.parse({ ...userQuery, languages: languagesQuery });
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
