import categoriesRepository from '@/infrastructure/repositories/categories.repository';

// TODO: cache it using React.cache
export const getAllCategoriesUseCase = async () => {
  return await categoriesRepository.getCategories();
};
