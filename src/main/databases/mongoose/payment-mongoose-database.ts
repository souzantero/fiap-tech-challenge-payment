import mongoose, { Schema } from 'mongoose';
import { Payment } from '../../../core/domain/entities/payment';
import {
  CreateOnePaymentData,
  PaymentRepository,
  UpdateOnePaymentData,
} from '../../../core/domain/repositories/payment-repository';

const PaymentSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
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
  status: {
    type: String,
    required: true,
  },
});

const PaymentModel = mongoose.model('Payment', PaymentSchema);

export class PaymentMongooseDatabase implements PaymentRepository {
  async findOneById(id: string): Promise<Payment | undefined> {
    const payment = await PaymentModel.findById(id);
    if (!payment) return undefined;
    return {
      id: payment._id.toString(),
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      deletedAt: payment.deletedAt,
      orderId: payment.orderId,
      status: payment.status,
    };
  }

  async updateOneById(
    id: string,
    data: UpdateOnePaymentData,
  ): Promise<Payment> {
    await PaymentModel.updateOne({ _id: id }, data);
    const payment = await this.findOneById(id);
    return payment!;
  }

  async createOne(data: CreateOnePaymentData): Promise<Payment> {
    const payment = await PaymentModel.create(data);
    return {
      id: payment._id.toString(),
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      deletedAt: payment.deletedAt,
      orderId: payment.orderId,
      status: payment.status,
    };
  }
}
