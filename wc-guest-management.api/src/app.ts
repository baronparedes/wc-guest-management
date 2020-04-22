import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import config from './config';
import './controllers/dashboard-controller';
import './controllers/guest-controller';
import './controllers/guest-info-controller';
import './controllers/profile-controller';
import { RegisterRoutes } from './routes';

const app = express();
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
if (config.NODE_ENV === 'development') {
    app.use(
        cors({
            origin: config.CLIENT_URI,
        })
    );
}

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
        status: 404,
    };
    next(notFound);
});

app.use(
    (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error('server error', err);
        res.status(err.status || 500).send(err.message);
    }
);

export default app;
