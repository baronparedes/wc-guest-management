import {
    BodyProp,
    Controller,
    Get,
    Post,
    Put,
    Query,
    Route
} from 'tsoa';
import { Guest } from '../@models/guest';
import { InfoSlip } from '../@types/models';
import GuestService from '../services/guest-service';

@Route('/api/guest')
export class GuestController extends Controller {
    private guestService: GuestService;

    constructor() {
        super();
        this.guestService = new GuestService();
    }

    @Get('/')
    public async fetchGuests(
        @Query() byVisitDate?: Date,
        @Query() byCriteria?: string
    ) {
        const result = await this.guestService.fetchGuestsByCriteria(
            byVisitDate,
            byCriteria
        );
        return result;
    }

    @Put('/{id}')
    public async updateGuestData(
        id: string,
        @BodyProp() guestData: Guest
    ): Promise<Guest> {
        const result = await this.guestService.updateGuest(
            id,
            guestData
        );
        return result;
    }

    @Post('/welcome')
    public async welcome(
        @BodyProp() infoSlip: InfoSlip,
        @BodyProp() print?: boolean
    ) {
        const result = await this.guestService.welcomeGuests(
            infoSlip,
            print
        );

        return result;
    }
}
