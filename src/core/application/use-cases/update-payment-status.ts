import { Payment } from '../../domain/entities/payment';
import { PaymentRepository } from '../../domain/repositories/payment-repository';

export class UpdatePaymentStatus {
  constructor(private readonly paymentRepository: PaymentRepository) {}
  async updateStatusById(id: string, status: string): Promise<Payment> {
    const paymentFound = await this.paymentRepository.findOneById(id);
    if (!paymentFound) {
      throw new PaymentNotFoundError();
    }

    return this.paymentRepository.updateOneById(id, { status });
  }
}

export class PaymentNotFoundError extends Error {
  constructor() {
    super('Payment not found');
    this.name = 'PaymentNotFoundError';
  }
}
