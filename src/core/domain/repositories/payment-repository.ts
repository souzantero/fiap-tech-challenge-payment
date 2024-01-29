import { Payment } from '../entities/payment';

export type CreateOnePaymentData = Omit<
  Payment,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface CreateOnePaymentRepository {
  createOne(data: CreateOnePaymentData): Promise<Payment>;
}

export type PaymentRepository = CreateOnePaymentRepository;
