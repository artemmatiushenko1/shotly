import { Category, categorySchema } from '@/entities/models/category';

import { db } from '../../../drizzle';
import { categoriesTable } from '../../../drizzle/schema';

class CategoriesRepository {
  async getCategories(): Promise<Category[]> {
    const categories = await db.select().from(categoriesTable);
    return categories.map((category) => categorySchema.parse(category));
  }
}

export default new CategoriesRepository();
