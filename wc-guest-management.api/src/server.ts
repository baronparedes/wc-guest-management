import * as dotenv from 'dotenv';
import * as http from 'http';
import * as mongoose from 'mongoose';
import app from './app';

dotenv.config();

const server = http.createServer(app);
server.listen(process.env.PORT);
server.on('listening', async () => {
    console.info(`Listening on port ${process.env.PORT}`);
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PWD,
            connectTimeoutMS: 3000
        })
        .catch(err => {
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
