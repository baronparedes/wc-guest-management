import * as express from 'express';
import AuthService from './services/auth-service';

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === 'api_token') {
        return Promise.reject('Not supported authentication type');
    }
    if (securityName === 'bearer') {
        const token = request.headers.authorization.split(' ')[1];
        const result = new AuthService().verifyToken(token);
        return result;
    }
    return Promise.reject({});
}
