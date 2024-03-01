import serverless from 'serverless-http';
import mongoose from 'mongoose';
import { APIGatewayProxyEvent, Context, SQSEvent, SQSHandler } from 'aws-lambda';
import { AddPayment } from '../core/application/use-cases';
import { App } from './app';
import { environment } from './configuration/environment';
import { PaymentMongooseDatabase } from './databases/mongoose/payment-mongoose-database';
import { OrderFetchProvider } from './providers/order-fetch-provider';

const connectMongoose = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(environment.databaseUrl);
  }
}

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  await connectMongoose();
  const repository = {
    payment: new PaymentMongooseDatabase(),
    order: new OrderFetchProvider(environment.orderUrl),
  };

  const app = App.create(repository);
  return serverless(app.express)(event, context);
};

export const onOrderAdded: SQSHandler = async (event: SQSEvent) => {
  try {
    await connectMongoose();
    const repository = new PaymentMongooseDatabase();
    const addPayment = new AddPayment(repository);
    const order = JSON.parse(event.Records[0].body);
    const addedPayment = await addPayment.addOne({ orderId: order.id });
    console.log('Payment added:', JSON.stringify(addedPayment));
  } catch (error) {
    console.error(error);
    throw error;
  }
}