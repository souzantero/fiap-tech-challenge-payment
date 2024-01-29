import { CreateOnePaymentRepository } from 'src/core/domain/repositories/payment-repository';
import { Payment } from '../../domain/entities/payment';

export class AddPayment {
  constructor(
    private readonly createOnePaymentRepository: CreateOnePaymentRepository,
  ) {}

  async addOne(data: AddOnePaymentData): Promise<Payment> {
    return await this.createOnePaymentRepository.createOne(data);
  }
}

export type AddOnePaymentData = Omit<
  Payment,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
