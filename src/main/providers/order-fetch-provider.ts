import { OrderRepository } from 'src/core/domain/repositories/order-repository';

export class OrderFetchProvider implements OrderRepository {
  constructor(private readonly url: string) {}

  async payOrder(orderId: string): Promise<void> {
    const response = await fetch(`${this.url}/orders/${orderId}/pay`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to pay order');
    }
  }
}
