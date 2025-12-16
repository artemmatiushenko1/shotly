import languagesRepository from '@/infrastructure/repositories/languages.repository';

export const getAllLanguagesUseCase = async () => {
  const languages = await languagesRepository.getAllLanguages();
  return languages;
};
