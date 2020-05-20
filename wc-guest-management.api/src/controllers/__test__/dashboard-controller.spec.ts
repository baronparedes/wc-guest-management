import * as faker from 'faker';
import { DashboardReport } from '../../@types/models';
import { generateFakeGuest } from '../../@utils/fake-models';
import DashboardService from '../../services/dashboard-service';
import GuestService from '../../services/guest-service';
import { DashboardController } from '../dashboard-controller';

describe('DashboardController', () => {
    afterAll(() => jest.clearAllMocks());

    it('should get dashboard report', async () => {
        const guests = [generateFakeGuest()];
        const expected: DashboardReport = {
            totalGuests: faker.random.number(),
            categories: [],
            summary: [],
        };
        const fetchGuestsByDateRangeSpy = jest
            .spyOn(GuestService.prototype, 'fetchGuestsByDateRange')
            .mockReturnValueOnce(new Promise((resolve) => resolve(guests)));

        const toDashboardReportSpy = jest
            .spyOn(DashboardService.prototype, 'toDashboardReport')
            .mockReturnValueOnce(expected);

        const now = new Date();
        const target = new DashboardController();
        const actual = await target.getDashboardReport(now, now);

        expect(fetchGuestsByDateRangeSpy).toBeCalledTimes(1);
        expect(fetchGuestsByDateRangeSpy).toBeCalledWith(now, now);
        expect(toDashboardReportSpy).toBeCalledTimes(1);
        expect(toDashboardReportSpy).toBeCalledWith(guests);
        expect(actual).toStrictEqual(expected);
    });
});
