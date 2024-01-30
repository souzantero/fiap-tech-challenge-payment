import {
  PaymentModel,
  PaymentMongooseDatabase,
} from './payment-mongoose-database';

describe('PaymentMongooseDatabase', () => {
  describe('findOneById', () => {
    it('should return undefined if PaymentModel.findById returns null', async () => {
      // Arrange
      const sut = new PaymentMongooseDatabase();
      jest.spyOn(PaymentModel, 'findById').mockResolvedValueOnce(null);

      // Act
      const payment = await sut.findOneById('any_id');

      // Assert
      expect(payment).toBeUndefined();
    });

    it('should return a payment if PaymentModel.findById returns a payment', async () => {
      // Arrange
      const sut = new PaymentMongooseDatabase();
      jest.spyOn(PaymentModel, 'findById').mockResolvedValueOnce({
        _id: 'any_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        orderId: 'any_order_id',
        status: 'any_status',
      });

      // Act
      const payment = await sut.findOneById('any_id');

      // Assert
      expect(payment).toEqual({
        id: 'any_id',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
        orderId: 'any_order_id',
        status: 'any_status',
      });
    });
  });

  describe('updateOneById', () => {
    it('should return a payment if PaymentModel.updateOne returns a payment', async () => {
      // Arrange
      const sut = new PaymentMongooseDatabase();
      jest.spyOn(sut, 'findOneById').mockResolvedValueOnce({
        id: 'any_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        orderId: 'any_order_id',
        status: 'any_status',
      });
      jest.spyOn(PaymentModel, 'updateOne').mockResolvedValueOnce({} as any);

      // Act
      const payment = await sut.updateOneById('any_id', {
        status: 'any_status',
      });

      // Assert
      expect(payment).toEqual({
        id: 'any_id',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
        orderId: 'any_order_id',
        status: 'any_status',
      });
    });
  });

  describe('createOne', () => {
    it('should return a payment if PaymentModel.create returns a payment', async () => {
      // Arrange
      const sut = new PaymentMongooseDatabase();
      jest.spyOn(PaymentModel, 'create').mockResolvedValueOnce({
        _id: 'any_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        orderId: 'any_order_id',
        status: 'any_status',
      } as any);

      // Act
      const payment = await sut.createOne({
        orderId: 'any_order_id',
        status: 'any_status',
      });

      // Assert
      expect(payment).toEqual({
        id: 'any_id',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
        orderId: 'any_order_id',
        status: 'any_status',
      });
    });
  });
});
