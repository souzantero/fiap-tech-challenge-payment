import { OrderRepository } from 'src/core/domain/repositories/order-repository';
import { Payment } from '../../domain/entities/payment';
import { PaymentRepository } from '../../domain/repositories/payment-repository';

export class UpdatePaymentStatus {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async updateStatusById(id: string, status: string): Promise<Payment> {
    const paymentFound = await this.paymentRepository.findOneById(id);
    if (!paymentFound) {
      throw new PaymentNotFoundError();
    }

    const payment = await this.paymentRepository.updateOneById(id, { status });

    if (status === 'approved') {
      await this.orderRepository.payOrder(payment.orderId);
    }

    return payment;
  }
}

export class PaymentNotFoundError extends Error {
  constructor() {
    super('Payment not found');
    this.name = 'PaymentNotFoundError';
  }
}
