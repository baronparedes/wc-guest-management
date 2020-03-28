import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import './controllers/dashboard-controller';
import './controllers/guest-controller';
import { RegisterRoutes } from './routes';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);
app.use(bodyParser.json());
app.use(morgan('dev'));

try {
    const swaggerDocument = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
    console.error(err);
}

RegisterRoutes(app);

app.use((req, res, next) => {
    const notFound = {
        message: 'Resource not found',
        status: 404
    };
    next(notFound);
});

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error('server error', err);
        res.status(err.status || 500).send(err.message);
    }
);

export default app;
