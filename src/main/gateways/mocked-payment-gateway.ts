import { Payment } from 'src/core/domain/entities/payment';
import { PaymentGateway } from 'src/core/domain/gateways';
import { environment } from '../configuration/environment';

const getRandomBoolean = () => Math.random() < 0.5;

export class MockedPaymentGateway implements PaymentGateway {
  async registerPayment(payment: Payment): Promise<void> {
    setTimeout(async () => {
      const hostAPI = `http://localhost:${environment.port}/api`;
      const url = `${hostAPI}/mercado-pago/hooks/payments/${payment.id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: getRandomBoolean() ? 'approved' : 'rejected',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Error on register payment', data);
      }
    }, 5000);
  }
}
