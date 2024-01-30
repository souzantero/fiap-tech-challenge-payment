import { paymentRoutes } from './payment-routes';

describe('paymentRoutes', () => {
  it('should call router.post with correct values', () => {
    // Arrange
    const router = {
      post: jest.fn(),
    } as any;
    const repository = {} as any;

    // Act
    paymentRoutes(router, repository);

    // Assert
    expect(router.post).toHaveBeenCalledWith('/payments', expect.any(Function));
  });
});
