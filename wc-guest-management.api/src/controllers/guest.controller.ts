import { BodyProp, Controller, Get, Post, Query, Route } from 'tsoa';
import { InfoSlip } from '../@types/models';
import GuestService from '../services/guest.service';

@Route('/api/guest')
export class GuestController extends Controller {
    private guestService: GuestService;

    constructor() {
        super();
        this.guestService = new GuestService();
    }

    @Get('/')
    public async getAll(
        @Query() byVisitDate?: Date,
        @Query() byVolunteer?: string
    ) {
        const result = await this.guestService.fetchGuests(
            byVisitDate,
            byVolunteer
        );
        return result;
    }

    @Post('/welcome')
    public async welcome(
        @BodyProp() infoSlip: InfoSlip,
        @BodyProp() print?: boolean
    ) {
        const result = await this.guestService.welcomeGuests(infoSlip);
        return result;
    }
}
