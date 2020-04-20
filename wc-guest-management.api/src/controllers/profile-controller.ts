import * as jwt from 'jsonwebtoken';
import { BodyProp, Controller, Get, Post, Request, Route, Security } from 'tsoa';
import { Profile } from '../@models/profile';
import { AuthResult } from '../@types/models';
import config from '../config';
import ProfileService from '../services/profile-service';

@Route('/api/profile')
export class ProfileController extends Controller {
    private profileService: ProfileService;

    constructor() {
        super();
        this.profileService = new ProfileService();
    }

    @Post('/auth')
    public async auth(
        @BodyProp() username: string,
        @BodyProp() password: string
    ): Promise<AuthResult> {
        const profile = await this.profileService.getProfile(username, password);
        const token = jwt.sign(profile, config.JWT_ACCESS_TOKEN);
        const result = {
            profile,
            token,
        };
        return result;
    }

    @Get('/me')
    @Security('bearer')
    public async me(@Request() request: any): Promise<Profile> {
        return request.user;
    }
}
