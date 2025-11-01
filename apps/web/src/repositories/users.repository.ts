import 'server-only';

import { db } from '@/db/drizzle';
import { languagesTable, usersTable, userLanguagesTable } from '@/db/schema';
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
      .select({ code: languagesTable.code })
      .from(languagesTable)
      .where(inArray(languagesTable.code, languageCodes));

    const newLanguageCodes = newLanguageRows.map((l) => l.code);

    await db
      .delete(userLanguagesTable)
      .where(eq(userLanguagesTable.userId, userId));

    if (newLanguageCodes.length > 0) {
      await db.insert(userLanguagesTable).values(
        newLanguageCodes.map((code) => ({
          userId,
          languageCode: code,
        })),
      );
    }
  }

  async updateUser(id: string, input: Partial<UserUpdate>): Promise<User> {
    const [query] = await db
      .update(usersTable)
      .set(input)
      .where(eq(usersTable.id, id))
      .returning();

    return userSchema.parse(query);
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    const [userQuery] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    const languagesQuery = await db
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

    return userProfileSchema.parse({ ...userQuery, languages: languagesQuery });
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
