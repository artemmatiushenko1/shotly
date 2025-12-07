import { desc, eq, inArray } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import {
  featuresTable,
  servicesTable,
  servicesToFeaturesTable,
} from '@/db/schema';
import { CreateServiceInput, Service, serviceSchema } from '@/domain/service';

// TODO: use drizzle relations
class ServicesRepository {
  async getServiceById(serviceId: string): Promise<Service | null> {
    const [service] = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.id, serviceId));

    return serviceSchema.parse({
      ...service,
      features: [],
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

  async getAllServices(userId: string): Promise<Service[]> {
    const services = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.photographerId, userId))
      .orderBy(desc(servicesTable.createdAt));

    if (services.length === 0) {
      return [];
    }

    const serviceIds = services.map((service) => service.id);
    const serviceFeaturesLinks = await db
      .select()
      .from(servicesToFeaturesTable)
      .where(inArray(servicesToFeaturesTable.serviceId, serviceIds));

    if (serviceFeaturesLinks.length === 0) {
      return services.map((service) =>
        serviceSchema.parse({
          ...service,
          features: [],
        }),
      );
    }

    const uniqueFeatureIds = [
      ...new Set(serviceFeaturesLinks.map((link) => link.featureId)),
    ];

    const features = await db
      .select({
        id: featuresTable.id,
        name: featuresTable.name,
      })
      .from(featuresTable)
      .where(inArray(featuresTable.id, uniqueFeatureIds));

    const featuresMap = new Map<string, string>();
    for (const feature of features) {
      featuresMap.set(feature.id, feature.name);
    }

    const serviceToFeaturesMap = new Map<string, string[]>();
    for (const link of serviceFeaturesLinks) {
      const featureName = featuresMap.get(link.featureId);
      if (!featureName) continue;

      if (!serviceToFeaturesMap.has(link.serviceId)) {
        serviceToFeaturesMap.set(link.serviceId, []);
      }
      serviceToFeaturesMap.get(link.serviceId)!.push(featureName);
    }

    return services.map((service) =>
      serviceSchema.parse({
        ...service,
        features: serviceToFeaturesMap.get(service.id) || [],
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
