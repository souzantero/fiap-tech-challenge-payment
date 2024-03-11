import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { adaptMiddleware, adaptRoute } from '../adapters/express-adapter';
import { makeMercadoPagoWebhookHttpController } from '../factories/mercado-pago-factories';
import { makeAuthorizationHttpMiddleware } from '../factories/middlewares/authorization-http-middleware-factory';

export const mercadoPagoRoutes = (router: Router, repository: Repository) => {
  router.post(
    '/mercado-pago/hooks/payments/:id',
    adaptMiddleware(makeAuthorizationHttpMiddleware()),
    adaptRoute(makeMercadoPagoWebhookHttpController(repository)),
  );
};
