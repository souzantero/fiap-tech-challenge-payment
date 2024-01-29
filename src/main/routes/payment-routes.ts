import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { adaptRoute } from './route';
import { makeAddOnePaymentHttpController } from '../factories/payment-factories';

export const paymentRoutes = (router: Router, repository: Repository) => {
  router.post(
    '/payments',
    adaptRoute(makeAddOnePaymentHttpController(repository)),
  );
};
