import mongoose from 'mongoose';
import { Repository } from 'src/core/domain/repositories/repository';
import { PaymentMongooseDatabase } from './payment-mongoose-database';

export class MongooseDatabase implements Repository {
  payment = new PaymentMongooseDatabase();

  constructor(private readonly url: string) {}

  async connect(): Promise<void> {
    await mongoose.connect(this.url);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
