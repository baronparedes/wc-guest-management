import { BodyProp, Controller, Post, Route } from 'tsoa';
import { InfoSlip } from '../@types/models';
import GuestService from '../services/guest-service';

@Route('/api/guest')
export class GuestInfoController extends Controller {
    private guestService: GuestService;

    constructor() {
        super();
        this.guestService = new GuestService();
    }

    @Post('/welcome')
    public async welcome(@BodyProp() infoSlip: InfoSlip, @BodyProp() print?: boolean) {
        const result = await this.guestService.welcomeGuests(infoSlip, print);

        return result;
    }
}
