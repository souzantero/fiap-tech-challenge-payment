import { OrderFetchProvider } from './order-fetch-provider';

describe('OrderFetchProvider', () => {
  describe('payOrder', () => {
    it('should call fetch with correct url and method', async () => {
      // Arrange
      const sut = new OrderFetchProvider('any_url');
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
      } as any);

      // Act
      await sut.payOrder('any_order_id');

      // Assert
      expect(fetchSpy).toHaveBeenCalledWith('any_url/orders/any_order_id/pay', {
        method: 'POST',
      });
    });
  });
});
