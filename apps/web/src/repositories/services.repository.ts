import { db } from '@/db/drizzle';
import {
  featuresTable,
  servicesTable,
  servicesToFeaturesTable,
} from '@/db/schema';
import {
  CreateServiceInput,
  Service,
  serviceSchema,
  ServiceStatus,
} from '@/domain/service';
import { desc, eq, inArray } from 'drizzle-orm';

// TODO: use drizzle relations
class ServicesRepository {
  async archiveService(serviceId: string) {
    await db
      .update(servicesTable)
      .set({ status: ServiceStatus.ARCHIVED })
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
