import { CreateOrderInput } from '@/entities/models/order';

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
}

export default new OrdersRepository();
