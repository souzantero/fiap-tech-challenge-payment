import { SQS } from 'aws-sdk';
import { environment } from './configuration/environment';
import { AmazonSQSPool } from './messaging/amazonsqs/amazonsqs-pool';
import { onOrderAdded } from './lambda';

export const pool = () => {
  const sqs = new SQS();
  const queueUrl = environment.orderAddedSQSQueueUrl;
  const pool = new AmazonSQSPool(sqs, queueUrl);

  const receive = () => {
    pool.receive(onOrderAdded).catch(console.error);
  };

  receive();
  setInterval(receive, 10000);
};
