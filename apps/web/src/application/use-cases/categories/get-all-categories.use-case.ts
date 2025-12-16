import { Locale } from '@/_i18n/config';
import categoriesRepository from '@/infrastructure/repositories/categories.repository';

// TODO: cache it using React.cache
export const getAllCategoriesUseCase = async (locale: Locale) => {
  const dbCategories = await categoriesRepository.getCategories();

  return dbCategories.map((category) => ({
    ...category,
    name: locale === Locale.UK ? category.nameUk : category.name,
  }));
};
