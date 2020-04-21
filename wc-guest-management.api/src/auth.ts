import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Profile } from './@models/profile';
import config from './config';

export function isProfileInScope(profile: Profile, targetScopes?: string[]) {
    if (targetScopes) {
        for (let scope of targetScopes) {
            if (!profile.scopes.includes(scope)) {
                return false;
            }
        }
    }
    return true;
}

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
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error('Unauthorized'));
            }
            const verified = (err: any, decoded: Profile) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (isProfileInScope(decoded, scopes)) resolve(decoded);
                else reject(new Error('Profile does not contain required access scope.'));
            };
            jwt.verify(token, config.JWT_ACCESS_TOKEN, verified);
        });
    }
    return Promise.reject({});
}
