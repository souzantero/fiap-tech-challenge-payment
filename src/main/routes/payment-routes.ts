import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { adaptMiddleware, adaptRoute } from '../adapters/express-adapter';
import { makeAddOnePaymentHttpController } from '../factories/payment-factories';
import { makeAuthorizationHttpMiddleware } from '../factories/middlewares/authorization-http-middleware-factory';

export const paymentRoutes = (router: Router, repository: Repository) => {
  router.post(
    '/payments',
    adaptMiddleware(makeAuthorizationHttpMiddleware()),
    adaptRoute(makeAddOnePaymentHttpController(repository)),
  );
};
