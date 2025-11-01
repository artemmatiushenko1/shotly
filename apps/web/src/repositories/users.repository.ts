import 'server-only';

import { db } from '@/db/drizzle';
import { user } from '@/db/schema';
import {
  User,
  UserProfile,
  userProfileSchema,
  userSchema,
  UserUpdate,
} from '@/domain/user';
import { eq } from 'drizzle-orm';

class UsersRepository {
  async updateUser(id: string, input: Partial<UserUpdate>): Promise<User> {
    const [query] = await db
      .update(user)
      .set(input)
      .where(eq(user.id, id))
      .returning();

    return userSchema.parse(query);
  }

  async getUserProfile(id: string): Promise<UserProfile> {
    const [query] = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    return userProfileSchema.parse(query);
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
