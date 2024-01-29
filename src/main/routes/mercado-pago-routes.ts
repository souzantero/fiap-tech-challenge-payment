import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { adaptRoute } from './route';
import { makeMercadoPagoWebhookHttpController } from '../factories/mercado-pago-factories';

export const mercadoPagoRoutes = (router: Router, repository: Repository) => {
  router.post(
    '/mercado-pago/hooks/payments/:id',
    adaptRoute(makeMercadoPagoWebhookHttpController(repository)),
  );
};
