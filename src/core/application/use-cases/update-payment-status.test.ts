import { UpdatePaymentStatus } from './update-payment-status';

const randomString = () => Math.random().toString(36).substring(7);

describe('UpdatePaymentStatus', () => {
  describe('updateStatusById', () => {
    it('should update payment status', async () => {
      // Arrange
      const id = randomString();
      const paymentRepository = {
        findOneById: () => Promise.resolve({ id }),
        updateOneById: (id: string, { status }: any) =>
          Promise.resolve({ id, status }),
      };
      const orderRepository = {
        payOrder: () => Promise.resolve(),
      };

      const updatePaymentStatus = new UpdatePaymentStatus(
        paymentRepository as any,
        orderRepository as any,
      );

      // Act
      const payment = await updatePaymentStatus.updateStatusById(
        id,
        'approved',
      );

      // Assert
      expect(payment).toHaveProperty('id', id);
      expect(payment).toHaveProperty('status', 'approved');
    });

    it('should throw PaymentNotFoundError when payment is not found', async () => {
      // Arrange
      const id = randomString();
      const paymentRepository = {
        findOneById: () => Promise.resolve(null),
      };
      const orderRepository = {};

      const updatePaymentStatus = new UpdatePaymentStatus(
        paymentRepository as any,
        orderRepository as any,
      );

      // Act
      const updateStatusById = updatePaymentStatus.updateStatusById(
        id,
        'denied',
      );

      // Assert
      await expect(updateStatusById).rejects.toThrow('Payment not found');
    });
  });
});
