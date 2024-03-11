import { OrderRepository } from '../../core/domain/repositories/order-repository';

export class OrderFetchProvider implements OrderRepository {
  constructor(private readonly url: string) {}

  async payOrder(orderId: string): Promise<void> {
    await fetch(`${this.url}/orders/${orderId}/pay`, {
      method: 'POST',
    });
  }
}
