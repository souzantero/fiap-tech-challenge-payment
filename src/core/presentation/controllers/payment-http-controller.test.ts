import { BadRequestError } from './http-controller';
import { AddOnePaymentHttpController } from './payment-http-controller';

describe('AddOnePaymentHttpController', () => {
  describe('handle', () => {
    it('should throw a BadRequestError if orderId is not provided', () => {
      // Arrange
      const sut = new AddOnePaymentHttpController(null as any);
      const request = {
        body: {},
      } as any;

      // Act
      const promise = sut.handle(request);

      // Assert
      expect(promise).rejects.toThrow(
        new BadRequestError('Missing required fields'),
      );
    });

    it('should call addPayment with correct params', async () => {
      // Arrange
      const addPayment = {
        addOne: jest.fn().mockResolvedValue({}),
      };
      const sut = new AddOnePaymentHttpController(addPayment as any);
      const request = {
        body: {
          orderId: 'any_order_id',
        },
      } as any;

      // Act
      await sut.handle(request);

      // Assert
      expect(addPayment.addOne).toHaveBeenCalledWith({
        orderId: 'any_order_id',
      });
    });
  });
});
