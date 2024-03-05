import { Payment } from '../entities/payment';

export interface PaymentGateway {
  registerPayment(payment: Payment): Promise<void>;
}
