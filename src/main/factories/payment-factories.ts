import { Repository } from '../../core/domain/repositories/repository';
import { AddPayment } from '../../core/application/use-cases/add-payment';
import { PaymentRepository } from '../../core/domain/repositories/payment-repository';
import { AddOnePaymentHttpController } from '../../core/presentation/controllers/payment-http-controller';
import { CatchErrorHttpControllerDecorator } from '../../core/presentation/decorators/catch-error-http-controller-decorator';
import { MockedPaymentGateway } from '../gateways/mocked-payment-gateway';

export const makeAddPayment = (repository: PaymentRepository) => {
  const mockedPaymentGateway = new MockedPaymentGateway();
  return new AddPayment(repository, mockedPaymentGateway);
};

export const makeAddOnePaymentHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new AddOnePaymentHttpController(makeAddPayment(repository.payment)),
  );
};
