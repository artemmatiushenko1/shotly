import { Service } from '@/entities/models/service';
import servicesRepository from '@/infrastructure/repositories/services.repository';

// TODO: inject repository
export const getPhotographerServicesUseCase = async (
  photographerId: string,
): Promise<Service[]> => {
  return await servicesRepository.getAllServices(photographerId);
};
