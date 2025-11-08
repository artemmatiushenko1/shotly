import { db } from '@/db/drizzle';
import { categoriesTable } from '@/db/schema';
import { Category, categorySchema } from '@/domain/category';
import { eq } from 'drizzle-orm';

class CategoriesRepository {
  async getCategories(): Promise<Category[]> {
    const categories = await db.select().from(categoriesTable);
    return categories.map((category) => categorySchema.parse(category));
  }

  async getCategoryById(id: string): Promise<Category> {
    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));

    if (!category) {
      // TODO: throw NotFoundError
      throw new Error('Category not found.');
    }

    return categorySchema.parse(category);
  }
}

export default new CategoriesRepository();
