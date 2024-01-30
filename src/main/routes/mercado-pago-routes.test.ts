import { mercadoPagoRoutes } from './mercado-pago-routes';

describe('mercadoPagoRoutes', () => {
  it('should call router.post with correct values', () => {
    // Arrange
    const router = {
      post: jest.fn(),
    } as any;
    const repository = {} as any;

    // Act
    mercadoPagoRoutes(router, repository);

    // Assert
    expect(router.post).toHaveBeenCalledWith(
      '/mercado-pago/hooks/payments/:id',
      expect.any(Function),
    );
  });
});
