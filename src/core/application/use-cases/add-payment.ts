import { CreateOnePaymentRepository } from '../../domain/repositories/payment-repository';
import { Payment } from '../../domain/entities/payment';
import { PaymentGateway } from '../../domain/gateways';

export class AddPayment {
  constructor(
    private readonly createOnePaymentRepository: CreateOnePaymentRepository,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async addOne(data: AddOnePaymentData): Promise<Payment> {
    const payment = await this.createOnePaymentRepository.createOne({
      ...data,
      status: 'pending',
    });

    await this.paymentGateway.registerPayment(payment);
    return payment;
  }
}

export type AddOnePaymentData = Omit<
  Payment,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'status'
>;
