import './utils/loadEnv';
import app from './server';

const port = Number(process.env.PORT || 3000);

app.listen(port);
