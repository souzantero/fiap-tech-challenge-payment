import { Repository } from '../../core/domain/repositories/repository';
import { AddPayment } from '../../core/application/use-cases/add-payment';
import { AddOnePaymentHttpController } from '../../core/presentation/controllers/payment-http-controller';
import { CatchErrorHttpControllerDecorator } from '../../core/presentation/decorators/catch-error-http-controller-decorator';

export const makeAddOnePaymentHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new AddOnePaymentHttpController(new AddPayment(repository.payment)),
  );
};
