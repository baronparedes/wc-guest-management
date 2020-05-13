import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PWD: process.env.MONGO_PWD,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    CLIENT_URI: process.env.CLIENT_URI,
};

export default config;
