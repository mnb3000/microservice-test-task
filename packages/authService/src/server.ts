import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/', routes);

export default app;
