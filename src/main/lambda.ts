import serverless from 'serverless-http';
import mongoose from 'mongoose';
import { App } from './app';
import { environment } from './configuration/environment';
import { PaymentMongooseDatabase } from './databases/mongoose/payment-mongoose-database';
import { OrderFetchProvider } from './providers/order-fetch-provider';

export const handler = async (event: any, context: any) => {
  await mongoose.connect(environment.databaseUrl);
  const repository = {
    payment: new PaymentMongooseDatabase(),
    order: new OrderFetchProvider(environment.orderUrl),
  };

  const app = App.create(repository);
  return serverless(app.express)(event, context);
};