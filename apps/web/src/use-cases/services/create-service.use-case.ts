import { CreateServiceInput } from '@/domain/service';
import servicesRepository from '@/repositories/services.repository';

export const createServiceUseCase = async (
  userId: string,
  input: CreateServiceInput,
) => {
  // TODO: use one storage service, add move image method
  await servicesRepository.createService(userId, input);
};
