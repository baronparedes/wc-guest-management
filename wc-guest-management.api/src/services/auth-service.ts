import * as jwt from 'jsonwebtoken';
import { Profile } from '../@models/profile';
import { AuthResult } from '../@types/models';
import config from '../config';
import ProfileService from './profile-service';

export default class AuthService {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    public async authenticate(encodedCredentials: string): Promise<AuthResult> {
        const basicAuth = encodedCredentials;
        const credentials = new Buffer(basicAuth.split(' ')[1], 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        const profile = await this.profileService.getProfile(username, password);
        const token = jwt.sign(profile, config.JWT_ACCESS_TOKEN);
        const result = {
            profile,
            token,
        };
        return result;
    }

    public isProfileInScope(profile: Profile, targetScopes?: string[]) {
        if (targetScopes) {
            for (let scope of targetScopes) {
                if (!profile.scopes.includes(scope)) {
                    return false;
                }
            }
        }
        return true;
    }

    public async verifyToken(token: string, scopes?: string[]) {
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error('Unauthorized'));
            }
            const verified = (err: any, decoded: Profile) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (this.isProfileInScope(decoded, scopes)) resolve(decoded);
                else reject(new Error('Profile does not contain required access scope.'));
            };
            jwt.verify(token, config.JWT_ACCESS_TOKEN, verified);
        });
    }
}
