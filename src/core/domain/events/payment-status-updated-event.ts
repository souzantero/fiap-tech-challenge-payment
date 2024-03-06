import { Payment } from '../entities/payment';

export interface PaymentStatusUpdatedEvent {
  onStatusUpdated(payment: Payment): Promise<void>;
}
