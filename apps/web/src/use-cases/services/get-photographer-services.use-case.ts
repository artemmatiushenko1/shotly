import { Service } from '@/domain/service';
import servicesRepository from '@/repositories/services.repository';

// TODO: inject repository
export const getPhotographerServicesUseCase = async (
  photographerId: string,
): Promise<Service[]> => {
  return await servicesRepository.getAllServices(photographerId);
};
