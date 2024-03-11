import {
  PaymentNotFoundError,
  UpdatePaymentStatus,
} from '../../../core/application/use-cases';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
  NotFoundError,
} from '../protocols/http';

export class MercadoPagoWebhookHttpController implements HttpController<void> {
  constructor(private readonly updatePaymentStatus: UpdatePaymentStatus) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const { id } = request.params;
    const { status } = request.body;

    if (!status) {
      throw new BadRequestError('Missing status');
    }

    try {
      await this.updatePaymentStatus.updateStatusById(id, status);
      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof PaymentNotFoundError) {
        throw new NotFoundError(error.message);
      }

      throw error;
    }
  }
}
