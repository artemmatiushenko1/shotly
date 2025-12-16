import { Locale } from '@/_i18n/config';
import languagesRepository from '@/infrastructure/repositories/languages.repository';

export const getAllLanguagesUseCase = async (locale: Locale) => {
  const languages = await languagesRepository.getAllLanguages();

  return languages.map((language) => ({
    ...language,
    name: locale === Locale.UK ? language.nameUk : language.name,
  }));
};
