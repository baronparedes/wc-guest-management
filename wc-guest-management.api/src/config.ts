import * as dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PWD: process.env.MONGODB_PWD
};
