import { db } from '@/db/drizzle';
import {
  featuresTable,
  servicesTable,
  servicesToFeaturesTable,
} from '@/db/schema';
import { CreateServiceInput, Service, serviceSchema } from '@/domain/service';
import { desc, eq, inArray } from 'drizzle-orm';

class ServicesRepository {
  async getAllServices(userId: string): Promise<Service[]> {
    const servicesQuery = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.photographerId, userId))
      .orderBy(desc(servicesTable.createdAt));

    const serviceFeaturesQuery = await db
      .select({
        serviceId: servicesToFeaturesTable.serviceId,
        featureId: servicesToFeaturesTable.featureId,
      })
      .from(servicesToFeaturesTable)
      .where(
        inArray(
          servicesToFeaturesTable.serviceId,
          servicesQuery.map((service) => service.id),
        ),
      );

    const featuresQuery = await db
      .select({
        id: featuresTable.id,
        name: featuresTable.name,
      })
      .from(featuresTable)
      .where(
        inArray(
          featuresTable.id,
          serviceFeaturesQuery.map(
            (serviceFeature) => serviceFeature.featureId,
          ),
        ),
      );

    return servicesQuery.map((service) =>
      serviceSchema.parse({
        ...service,
        features: featuresQuery.map((feature) => feature.name),
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
        status: input.status,
        photographerId: userId,
        categoryId: input.categoryId,
      })
      .returning();

    if (!service) {
      throw new Error('Failed to create service.');
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

    return serviceSchema.parse({
      ...service,
      features: createdFeatures.map((feature) => feature.name),
    });
  }
}

const servicesRepository = new ServicesRepository();

export default servicesRepository;
