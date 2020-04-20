import { Controller, Get, Query, Route, Security } from 'tsoa';
import DashboardService from '../services/dashboard-service';
import GuestService from '../services/guest-service';

@Security('bearer')
@Route('/api/dashboard')
export class DashboardController extends Controller {
    private dashboardService: DashboardService;
    private guestService: GuestService;

    constructor() {
        super();
        this.dashboardService = new DashboardService();
        this.guestService = new GuestService();
    }

    @Get('/')
    public async getDashboardReport(@Query() fromDate?: Date, @Query() toDate?: Date) {
        const guests = await this.guestService.fetchGuestsByDateRange(fromDate, toDate);
        const result = this.dashboardService.toDashboardReport(guests);
        return result;
    }
}
