import * as jwt from 'jsonwebtoken';
import { BodyProp, Controller, Get, Post, Request, Route, Security } from 'tsoa';
import { AuthProfile } from '../@types/models';
import config from '../config';

@Route('/api/profile')
export class ProfileController extends Controller {
    constructor() {
        super();
    }

    @Post('/auth')
    public async auth(@BodyProp() email: string, @BodyProp() password: string) {
        // const result = await this.guestService.welcomeGuests(infoSlip, print);
        const authProfile: AuthProfile = {
            profile: {
                _id: '123456',
                email,
                name: 'Baron Paredes',
            },
        };
        const result = jwt.sign(authProfile, config.JWT_ACCESS_TOKEN);
        return result;
    }

    @Get('/me')
    @Security('bearer')
    public async me(@Request() request: any) {
        return request.user;
    }
}
