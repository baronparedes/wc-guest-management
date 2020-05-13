import * as http from 'http';
import * as mongoose from 'mongoose';
import app from './app';
import config from './config';

const server = http.createServer(app);
server.listen(config.PORT);
server.on('listening', async () => {
    console.info(`Listening on port ${config.PORT}`);
    mongoose
        .connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
            user: config.MONGO_USER,
            pass: config.MONGO_PWD,
            connectTimeoutMS: 3000,
        })
        .catch((err) => {
            console.error('App starting error:', err.stack);
            process.exit(1);
        });
    mongoose.connection.once('open', () => {
        console.info('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err: any) => {
        console.error(err);
    });
});
