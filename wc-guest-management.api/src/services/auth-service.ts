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

    private getAuthCredentials(encodedCredentials: string) {
        try {
            return encodedCredentials.split(' ')[1];
        } catch {
            throw new Error('Invalid authorization credentials');
        }
    }

    public async authenticate(encodedCredentials: string): Promise<AuthResult> {
        const basicAuth = this.getAuthCredentials(encodedCredentials);
        const credentials = new Buffer(basicAuth, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        const profile = await this.profileService.getProfile(username, password);
        const token = jwt.sign(profile, config.JWT_ACCESS_TOKEN, {
            expiresIn: '30d',
        });
        const result = {
            profile,
            token,
        };
        return result;
    }

    public isProfileInScope(profile: Profile, targetScopes?: string[]) {
        // TODO: Role based accounts
        if (targetScopes) {
            for (let scope of targetScopes) {
                if (!profile.scopes.includes(scope)) {
                    return false;
                }
            }
        }
        return true;
    }

    public async verifyAuthorization(
        encodedCredentials: string,
        scopes?: string[]
    ): Promise<Profile> {
        const token = this.getAuthCredentials(encodedCredentials);
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error('Unauthorized'));
            }
            const verified = (err: jwt.VerifyErrors, decoded: Profile) => {
                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        reject(new Error('Your login session has expired, please relogin'));
                    } else {
                        reject(err);
                    }
                    return;
                }
                if (this.isProfileInScope(decoded, scopes)) resolve(decoded);
                else reject(new Error('Profile does not contain required access scope.'));
            };
            jwt.verify(token, config.JWT_ACCESS_TOKEN, verified);
        });
    }
}
