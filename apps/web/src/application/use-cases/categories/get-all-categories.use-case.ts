import categoriesRepository from '@/repositories/categories.repository';

export const getAllCategoriesUseCase = async () => {
  return await categoriesRepository.getCategories();
};
