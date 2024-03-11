import { Payment } from '../../core/domain/entities/payment';
import { PaymentGateway } from '../../core/domain/gateways';

export class MockedPaymentGateway implements PaymentGateway {
  registerPayment(payment: Payment): Promise<void> {
    return Promise.resolve();
  }
}
