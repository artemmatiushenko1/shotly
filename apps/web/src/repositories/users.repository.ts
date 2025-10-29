import { db } from '@/db/drizzle';
import { user } from '@/db/schema';
import { User, userSchema, UserUpdate } from '@/domain/user';
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
}

const usersRepository = new UsersRepository();

export default usersRepository;
