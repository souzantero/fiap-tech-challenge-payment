import { PaymentGateway } from 'src/core/domain/gateways';
import { PaymentRepository } from '../../../core/domain/repositories/payment-repository';
import { AddPayment } from './add-payment';

const randomString = (length = 10) =>
  Math.random().toString(36).substring(length);

describe('AddPayment', () => {
  it('should add a payment', async () => {
    // Arrange
    const id = randomString();
    const now = new Date();
    const paymentRepository: PaymentRepository = {
      createOne: (data) =>
        Promise.resolve({
          ...data,
          id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
          status: 'pending',
        }),
      findOneById: () => Promise.resolve(undefined),
      updateOneById: () => Promise.resolve({} as any),
    };
    const paymentGateway: PaymentGateway = {
      registerPayment: () => Promise.resolve(),
    };
    const addPayment = new AddPayment(paymentRepository, paymentGateway);
    const data = {
      orderId: randomString(),
    };

    // Act
    const payment = await addPayment.addOne(data);

    // Assert
    expect(payment).toHaveProperty('id', id);
    expect(payment).toHaveProperty('createdAt', now);
    expect(payment).toHaveProperty('updatedAt', now);
    expect(payment).toHaveProperty('deletedAt', null);
    expect(payment).toHaveProperty('status', 'pending');
  });
});
