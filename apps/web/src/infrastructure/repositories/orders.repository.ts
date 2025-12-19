import { desc, eq } from 'drizzle-orm';

import { CreateOrderInput, Order, orderSchema } from '@/entities/models/order';

import { db } from '../../../drizzle';
import { ordersTable } from '../../../drizzle/schema';

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
}

export default new OrdersRepository();
