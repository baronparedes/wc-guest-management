import * as http from 'http';
import * as mongoose from 'mongoose';
import app from './app';

const MONGODB_URI = 'mongodb://localhost:27017/todo?authSource=admin';
const MONGODB_URI_LIVE =
    'mongodb+srv://root:YukwsCsKvTKqGB7y@cluster0-psvh0.mongodb.net/test?retryWrites=true&w=majority';
const PORT = 3001;
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async () => {
    console.info(`Listening on port ${PORT}`);
    mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: 'root',
            pass: 'password',
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
