import { db } from '@/db/drizzle';
import { categoriesTable } from '@/db/schema';
import { Category, categorySchema } from '@/domain/category';

class CategoriesRepository {
  async getCategories(): Promise<Category[]> {
    const categories = await db.select().from(categoriesTable);
    return categories.map((category) => categorySchema.parse(category));
  }
}

export default new CategoriesRepository();
