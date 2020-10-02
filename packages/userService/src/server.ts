import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';
import { createConnection } from 'typeorm';

interface IUserJWT {
  userId: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserJWT;
  }
}

const createExpressApp = async () => {
  await createConnection();
  const app = express();

  app.use(helmet());
  app.use(bodyParser.json());

  app.use('/', routes);
  return app;
}

export default createExpressApp;
