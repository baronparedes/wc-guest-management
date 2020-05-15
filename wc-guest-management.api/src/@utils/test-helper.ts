import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

const opts: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}; // remove this option if you use mongoose 5 and above
export let mongoServer: MongoMemoryServer;
export async function startDb() {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, (err) => {
        if (err) console.error(err);
    });
}
export async function stopDb() {
    await mongoose.disconnect();
    await mongoServer.stop();
}
