import { Payment } from '../entities/payment';

export type CreateOnePaymentData = Omit<
  Payment,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UpdateOnePaymentData = Partial<
  Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'orderId'>
>;

export interface CreateOnePaymentRepository {
  createOne(data: CreateOnePaymentData): Promise<Payment>;
}

export interface FindOnePaymentRepository {
  findOneById(id: string): Promise<Payment | undefined>;
}

export interface UpdateOnePaymentRepository {
  updateOneById(id: string, data: UpdateOnePaymentData): Promise<Payment>;
}

export type PaymentRepository = CreateOnePaymentRepository &
  FindOnePaymentRepository &
  UpdateOnePaymentRepository;
