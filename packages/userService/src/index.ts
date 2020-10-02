import './utils/loadEnv';
import createExpressApp from './server';

const port = Number(process.env.PORT || 3000);

createExpressApp().then(app => {
  app.listen(port)
});
