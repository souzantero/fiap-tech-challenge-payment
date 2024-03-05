import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { App } from './app';
import { environment } from './configuration/environment';
import { PaymentMongooseDatabase } from './databases/mongoose/payment-mongoose-database';
import { OrderFetchProvider } from './providers/order-fetch-provider';

mongoose.connect(environment.databaseUrl).then(() => {
  const repository = {
    payment: new PaymentMongooseDatabase(),
    order: new OrderFetchProvider(environment.orderUrl),
  };

  const app = App.create(repository);
  app.start(environment.port);
});
