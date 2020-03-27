declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: number;
        MONGODB_URI: string;
        MONGODB_USER: string;
        MONGODB_PWD: string;
    }
}
