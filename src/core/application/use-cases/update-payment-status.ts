import { Payment } from '../../domain/entities/payment';
import { PaymentRepository } from '../../domain/repositories/payment-repository';
import { PaymentStatusUpdatedEvent } from '../../domain/events';

export class UpdatePaymentStatus {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentStatusUpdatedEvent: PaymentStatusUpdatedEvent,
  ) {}

  async updateStatusById(id: string, status: string): Promise<Payment> {
    const paymentFound = await this.paymentRepository.findOneById(id);
    if (!paymentFound) {
      throw new PaymentNotFoundError();
    }

    const payment = await this.paymentRepository.updateOneById(id, { status });
    await this.paymentStatusUpdatedEvent.onStatusUpdated(payment);
    return payment;
  }
}

export class PaymentNotFoundError extends Error {
  constructor() {
    super('Payment not found');
    this.name = 'PaymentNotFoundError';
  }
}
