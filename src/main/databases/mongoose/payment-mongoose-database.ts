import mongoose, { Schema } from 'mongoose';
import { Payment } from 'src/core/domain/entities/payment';
import {
  CreateOnePaymentData,
  PaymentRepository,
} from 'src/core/domain/repositories/payment-repository';

const PaymentSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  orderId: {
    type: String,
    required: true,
  },
});

const PaymentModel = mongoose.model('Payment', PaymentSchema);

export class PaymentMongooseDatabase implements PaymentRepository {
  async createOne(data: CreateOnePaymentData): Promise<Payment> {
    const payment = await PaymentModel.create(data);
    return {
      id: payment.id,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      deletedAt: payment.deletedAt,
      orderId: payment.orderId,
    };
  }
}
