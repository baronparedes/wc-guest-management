declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: number;
        MONGODB_URI: string;
        MONGODB_USER: string;
        MONGODB_PWD: string;
        JWT_ACCESS_TOKEN: string;
        JWT_REFRESH_TOKEN: string;
        CLIENT_URI: string;
    }
}
