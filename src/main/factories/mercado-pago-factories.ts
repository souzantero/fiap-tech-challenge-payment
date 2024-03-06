import { UpdatePaymentStatus } from '../../core/application/use-cases';
import { Repository } from '../../core/domain/repositories/repository';
import { MercadoPagoWebhookHttpController } from '../../core/presentation/controllers/mercado-pago-http-controller';
import { CatchErrorHttpControllerDecorator } from '../../core/presentation/decorators/catch-error-http-controller-decorator';
import { environment } from '../configuration/environment';
import { AmazonSQSPaymentMessenger } from '../messaging/amazonsqs/amazonsqs-payment-messenger';
import { AmazonSQSService } from '../messaging/amazonsqs/amazonsqs-service';

export const makeMercadoPagoWebhookHttpController = (
  repository: Repository,
) => {
  const queueUrlByStatus = {
    approved: environment.paymentApprovedSQSQueueUrl,
    rejected: environment.paymentRejectedSQSQueueUrl,
  };
  const amazonSQSPaymentMessenger = new AmazonSQSPaymentMessenger(
    AmazonSQSService.getInstance().sqs,
    queueUrlByStatus,
  );

  return new CatchErrorHttpControllerDecorator(
    new MercadoPagoWebhookHttpController(
      new UpdatePaymentStatus(repository.payment, amazonSQSPaymentMessenger),
    ),
  );
};
