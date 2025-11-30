import { CreateServiceInput } from '@/domain/service';
import servicesRepository from '@/repositories/services.repository';

export const createServiceUseCase = async (
  userId: string,
  input: CreateServiceInput,
) => {
  await servicesRepository.createService(userId, input);
};
