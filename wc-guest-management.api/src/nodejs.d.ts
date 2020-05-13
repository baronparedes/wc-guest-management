declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: number;
        MONGO_URL: string;
        MONGO_USER: string;
        MONGO_PWD: string;
        JWT_ACCESS_TOKEN: string;
        JWT_REFRESH_TOKEN: string;
        CLIENT_URI: string;
    }
}
