import {
  CreateServiceInput,
  createServiceInputSchema,
} from '@/entities/models/service';
import servicesRepository from '@/infrastructure/repositories/services.repository';

export const createServiceUseCase = async (
  userId: string,
  input: CreateServiceInput,
) => {
  await servicesRepository.createService(
    userId,
    createServiceInputSchema.parse(input),
  );
};
