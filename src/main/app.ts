import { Server } from 'node:http';
import express, { Router } from 'express';
import swagger from 'swagger-ui-express';

import openapi from './documentation/openapi.json';
import { Repository } from '../core/domain/repositories/repository';
import { paymentRoutes } from './routes/payment-routes';

export class App {
  private constructor(private readonly app: express.Express) {}

  static create(repository: Repository) {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const router = Router();
    paymentRoutes(router, repository);

    router.get('/health', (_, res) =>
      res.status(200).json({
        uptime: process.uptime(),
      }),
    );

    app.use('/api', router);
    app.use('/api/docs', swagger.serve, swagger.setup(openapi));

    return new App(app);
  }

  start(port: number): Server {
    return this.app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
}
