export interface OrderRepository {
  payOrder(orderId: string): Promise<void>;
}
