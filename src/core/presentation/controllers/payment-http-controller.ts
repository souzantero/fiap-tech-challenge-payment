import { Payment } from '../../domain/entities/payment';
import { AddPayment } from '../../application/use-cases';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
} from '../protocols/http';

export class AddOnePaymentHttpController implements HttpController<Payment> {
  constructor(private readonly addPayment: AddPayment) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Payment>> {
    const { orderId } = request.body;

    if (!orderId) {
      throw new BadRequestError('Missing required fields');
    }

    const payment = await this.addPayment.addOne({ orderId });
    return HttpResponse.created(payment);
  }
}
