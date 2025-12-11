import categoriesRepository from '@/infrastructure/repositories/categories.repository';

export const getAllCategoriesUseCase = async () => {
  return await categoriesRepository.getCategories();
};
