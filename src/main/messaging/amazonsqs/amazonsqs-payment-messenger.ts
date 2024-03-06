import { SQS } from 'aws-sdk';
import { PaymentStatusUpdatedEvent } from '../../../core/domain/events';
import { Payment } from '../../../core/domain/entities/payment';

export type QueueUrlByStatus = {
  [status: string]: string;
};

export class AmazonSQSPaymentMessenger implements PaymentStatusUpdatedEvent {
  constructor(
    private readonly sqs: SQS,
    private readonly queueUrlByStatus: QueueUrlByStatus,
  ) {}

  async onStatusUpdated(payment: Payment): Promise<void> {
    const queueUrl = this.queueUrlByStatus[payment.status];
    if (!queueUrl) {
      return;
    }

    const params: SQS.SendMessageRequest = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(payment),
    };

    await this.sqs.sendMessage(params).promise();
  }
}
