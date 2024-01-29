import { UpdatePaymentStatus } from '../../core/application/use-cases';
import { Repository } from '../../core/domain/repositories/repository';
import { MercadoPagoWebhookHttpController } from '../../core/presentation/controllers/mercado-pago-http-controller';
import { CatchErrorHttpControllerDecorator } from '../../core/presentation/decorators/catch-error-http-controller-decorator';

export const makeMercadoPagoWebhookHttpController = (
  repository: Repository,
) => {
  return new CatchErrorHttpControllerDecorator(
    new MercadoPagoWebhookHttpController(
      new UpdatePaymentStatus(repository.payment),
    ),
  );
};
