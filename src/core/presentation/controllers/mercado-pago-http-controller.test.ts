import { PaymentNotFoundError } from '../../application/use-cases';
import { BadRequestError } from '../protocols/http';
import { MercadoPagoWebhookHttpController } from './mercado-pago-http-controller';

describe('MercadoPagoWebhookHttpController', () => {
  describe('handle', () => {
    it('should throw a BadRequestError if status is not provided', () => {
      // Arrange
      const sut = new MercadoPagoWebhookHttpController(null as any);
      const request = {
        params: { id: 'any_id' },
        body: {},
      } as any;

      // Act
      const promise = sut.handle(request);

      // Assert
      expect(promise).rejects.toThrow(new BadRequestError('Missing status'));
    });

    it('should call updatePaymentStatus with correct params', async () => {
      // Arrange
      const updatePaymentStatus = {
        updateStatusById: jest.fn().mockResolvedValue({}),
      };

      const sut = new MercadoPagoWebhookHttpController(
        updatePaymentStatus as any,
      );
      const request = {
        params: { id: 'any_id' },
        body: { status: 'any_status' },
      } as any;

      // Act
      const response = await sut.handle(request);

      // Assert
      expect(updatePaymentStatus.updateStatusById).toHaveBeenCalledWith(
        'any_id',
        'any_status',
      );
      expect(response.status).toBe(204);
      expect(response.body).toEqual(undefined);
    });

    it('should throw a NotFoundError if updatePaymentStatus throws a PaymentNotFoundError', () => {
      // Arrange
      const updatePaymentStatus = {
        updateStatusById: jest
          .fn()
          .mockRejectedValue(new PaymentNotFoundError()),
      };

      const sut = new MercadoPagoWebhookHttpController(
        updatePaymentStatus as any,
      );
      const request = {
        params: { id: 'any_id' },
        body: { status: 'any_status' },
      } as any;

      // Act
      const promise = sut.handle(request);

      // Assert
      expect(promise).rejects.toThrow(new BadRequestError('Payment not found'));
    });

    it('should throw a error if updatePaymentStatus throws a error', () => {
      // Arrange
      const updatePaymentStatus = {
        updateStatusById: jest
          .fn()
          .mockRejectedValue(new Error('unexpected_error')),
      };

      const sut = new MercadoPagoWebhookHttpController(
        updatePaymentStatus as any,
      );
      const request = {
        params: { id: 'any_id' },
        body: { status: 'any_status' },
      } as any;

      // Act
      const promise = sut.handle(request);

      // Assert
      expect(promise).rejects.toThrow(new Error('unexpected_error'));
    });
  });
});
