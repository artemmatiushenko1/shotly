import { and, desc, eq } from 'drizzle-orm';

import { VisibilityStatus } from '@/entities/models/common';
import {
  CreateServiceInput,
  Service,
  serviceSchema,
} from '@/entities/models/service';

import { db } from '../../../drizzle';
import {
  featuresTable,
  servicesTable,
  servicesToFeaturesTable,
} from '../../../drizzle/schema';

// TODO: use drizzle relations
class ServicesRepository {
  async getServiceById(serviceId: string): Promise<Service | null> {
    const service = await db.query.servicesTable.findFirst({
      where: eq(servicesTable.id, serviceId),
      with: {
        category: true,
        servicesToFeatures: {
          with: {
            feature: true,
          },
        },
      },
    });

    if (!service) {
      return null;
    }

    return serviceSchema.parse({
      ...service,
      features: service.servicesToFeatures.map((stf) => stf.feature.name),
    });
  }

  async archiveService(serviceId: string) {
    await db
      .update(servicesTable)
      .set({
        archivedAt: new Date(),
      })
      .where(eq(servicesTable.id, serviceId));
  }

  async restoreService(serviceId: string) {
    await db
      .update(servicesTable)
      .set({
        archivedAt: null,
      })
      .where(eq(servicesTable.id, serviceId));
  }

  async getAllServices(
    userId: string,
    visibilityStatus?: VisibilityStatus,
  ): Promise<Service[]> {
    const services = await db.query.servicesTable.findMany({
      where: and(
        eq(servicesTable.photographerId, userId),
        visibilityStatus
          ? eq(servicesTable.visibilityStatus, visibilityStatus)
          : undefined,
      ),
      orderBy: desc(servicesTable.createdAt),
      with: {
        category: true,
        servicesToFeatures: {
          with: {
            feature: true,
          },
        },
      },
    });

    if (services.length === 0) {
      return [];
    }

    return services.map((service) =>
      serviceSchema.parse({
        ...service,
        features: service.servicesToFeatures.map((stf) => stf.feature.name),
      }),
    );
  }

  async createService(userId: string, input: CreateServiceInput) {
    // TODO: should be in transaction
    const [service] = await db
      .insert(servicesTable)
      .values({
        name: input.name,
        description: input.description ?? null,
        coverImageUrl: input.coverImageUrl,
        deliveryTimeInDays: input.deliveryTimeInDays,
        price: input.price ?? 0,
        currency: input.currency ?? 'UAH',
        visibilityStatus: input.visibilityStatus,
        photographerId: userId,
        categoryId: input.categoryId,
      })
      .returning();

    if (!service) {
      return null;
    }

    const features = input.features ?? [];
    let createdFeatures: { id: string; name: string }[] = [];

    if (features && features.length > 0) {
      const featuresToInsert = features.map((name) => ({
        name: name,
        photographerId: userId,
      }));

      createdFeatures = await db
        .insert(featuresTable)
        .values(featuresToInsert)
        .returning({ id: featuresTable.id, name: featuresTable.name });
    }

    await db.insert(servicesToFeaturesTable).values(
      createdFeatures.map((feature) => ({
        serviceId: service.id,
        featureId: feature.id,
      })),
    );
  }

  async updateService(serviceId: string, input: Partial<CreateServiceInput>) {
    return await db.transaction(async (tx) => {
      const [updatedService] = await tx
        .update(servicesTable)
        .set({
          name: input.name,
          description: input.description,
          coverImageUrl: input.coverImageUrl,
          deliveryTimeInDays: input.deliveryTimeInDays,
          price: input.price,
          currency: input.currency,
          visibilityStatus: input.visibilityStatus,
          categoryId: input.categoryId,
        })
        .where(eq(servicesTable.id, serviceId))
        .returning();

      if (!updatedService) {
        return null;
      }

      if (input.features !== undefined) {
        await tx
          .delete(servicesToFeaturesTable)
          .where(eq(servicesToFeaturesTable.serviceId, serviceId));

        if (input.features.length > 0) {
          const featuresToInsert = input.features.map((name) => ({
            name: name,
            photographerId: updatedService.photographerId,
          }));

          const createdFeatures = await tx
            .insert(featuresTable)
            .values(featuresToInsert)
            .returning({ id: featuresTable.id });

          await tx.insert(servicesToFeaturesTable).values(
            createdFeatures.map((feature) => ({
              serviceId: updatedService.id,
              featureId: feature.id,
            })),
          );
        }
      }

      return updatedService;
    });
  }
}

const servicesRepository = new ServicesRepository();

export default servicesRepository;
