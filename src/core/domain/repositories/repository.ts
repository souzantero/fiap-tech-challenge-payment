import { OrderRepository } from './order-repository';
import { PaymentRepository } from './payment-repository';

export interface Repository {
  payment: PaymentRepository;
  order: OrderRepository;
}
