import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import requestLogger from './middlewares/requestLogger';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

app.get('/', (_, res) => {
    res.send('Hello World!');
});

export default app;
