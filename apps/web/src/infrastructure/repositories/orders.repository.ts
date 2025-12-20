import { desc, eq } from 'drizzle-orm';

import {
  CreateOrderInput,
  Order,
  orderSchema,
  OrderStatus,
} from '@/entities/models/order';
import { CreateReviewInput } from '@/entities/models/review';

import { db } from '../../../drizzle';
import { ordersTable, reviewsTable } from '../../../drizzle/schema';

class OrdersRepository {
  async createOrder(input: CreateOrderInput): Promise<string | null> {
    const [order] = await db
      .insert(ordersTable)
      .values(input)
      .returning({ id: ordersTable.id });

    if (!order) {
      return null;
    }

    return order.id;
  }

  async getClientOrders(clientId: string): Promise<Order[]> {
    const orders = await db.query.ordersTable.findMany({
      where: eq(ordersTable.clientId, clientId),
      with: {
        client: true,
        photographer: true,
        service: {
          with: {
            category: true,
            servicesToFeatures: {
              with: {
                feature: true,
              },
            },
          },
        },
        review: true,
      },
      orderBy: desc(ordersTable.createdAt),
    });

    return orders.map((order) => {
      return orderSchema.parse({
        ...order,
        service: {
          ...order.service,
          features: order.service.servicesToFeatures.map(
            (stf) => stf.feature.name,
          ),
        },
      });
    });
  }

  async getPhotographerOrders(photographerId: string): Promise<Order[]> {
    const orders = await db.query.ordersTable.findMany({
      where: eq(ordersTable.photographerId, photographerId),
      with: {
        client: true,
        photographer: true,
        service: {
          with: {
            category: true,
            servicesToFeatures: {
              with: {
                feature: true,
              },
            },
          },
        },
      },
      orderBy: desc(ordersTable.createdAt),
    });

    return orders.map((order) => {
      return orderSchema.parse({
        ...order,
        service: {
          ...order.service,
          features: order.service.servicesToFeatures.map(
            (stf) => stf.feature.name,
          ),
        },
      });
    });
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await db.query.ordersTable.findFirst({
      where: eq(ordersTable.id, orderId),
      with: {
        client: true,
        photographer: true,
        service: {
          with: {
            category: true,
            servicesToFeatures: {
              with: {
                feature: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return orderSchema.parse({
      ...order,
      service: {
        ...order.service,
        features: order.service.servicesToFeatures.map(
          (stf) => stf.feature.name,
        ),
      },
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    await db
      .update(ordersTable)
      .set({ status })
      .where(eq(ordersTable.id, orderId));
  }

  async createOrderReview(input: CreateReviewInput) {
    await db.insert(reviewsTable).values(input);
  }
}

export default new OrdersRepository();
