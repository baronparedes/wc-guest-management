import { BodyProp, Controller, Get, Put, Query, Route, Security } from 'tsoa';
import { Guest } from '../@models/guest';
import { ReportCategory, Slot } from '../@types/models';
import GuestService from '../services/guest-service';

@Security('bearer')
@Route('/api/guest')
export class GuestController extends Controller {
    private guestService: GuestService;

    constructor() {
        super();
        this.guestService = new GuestService();
    }

    @Get('/')
    public async fetchGuests(
        @Query() fromDate?: Date,
        @Query() toDate?: Date,
        @Query() criteria?: string,
        @Query() slot?: Slot
    ) {
        const result = await this.guestService.fetchGuests(
            fromDate,
            toDate,
            criteria,
            slot
        );
        return result;
    }

    @Put('/{id}')
    public async updateGuestData(id: string, @BodyProp() guestData: Guest): Promise<Guest> {
        const result = await this.guestService.updateGuest(id, guestData);
        return result;
    }

    @Get('/category/{category}')
    public async fetchGuestsByCategory(
        category: ReportCategory,
        @Query() slot?: Slot,
        @Query() index?: string,
        @Query() fromDate?: Date,
        @Query() toDate?: Date
    ) {
        const result = await this.guestService.fetchGuestsByCategory(
            fromDate,
            toDate,
            category,
            index,
            slot
        );
        return result;
    }
}
