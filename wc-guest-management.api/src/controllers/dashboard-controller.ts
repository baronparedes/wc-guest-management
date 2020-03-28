import { Controller, Get, Query, Route } from 'tsoa';
import { DashboardLineItem, DashboardReport } from '../@types/models';

@Route('/api/dashboard')
export class DashboardController extends Controller {
    constructor() {
        super();
    }

    @Get('/')
    public async getDashboardReport(
        @Query() fromDate?: Date,
        @Query() toDate?: Date
    ) {
        console.log(fromDate, 'server');
        console.log(toDate, 'server');

        const generateDummyData = (category: string, label: string) => {
            const result: DashboardLineItem = {
                category: category,
                label: label,
                metrics: [
                    { slot: 'AM', count: 40 },
                    { slot: 'NN', count: 31 },
                    { slot: 'PM', count: 56 },
                    { slot: '', count: 20 }
                ]
            };

            return result;
        };
        const result: DashboardReport = {
            activityCategory: [
                generateDummyData('activity', 'accepted'),
                generateDummyData('activity', 'not accepted'),
                generateDummyData('activity', 'prayed'),
                generateDummyData('activity', 'counseled'),
                generateDummyData('activity', '')
            ],
            ageCategory: [
                generateDummyData('age group', '< 20'),
                generateDummyData('age group', '21 - 30'),
                generateDummyData('age group', '31 - 40'),
                generateDummyData('age group', '41 - 50'),
                generateDummyData('age group', '> 50'),
                generateDummyData('age group', '')
            ],
            summary: [
                { slot: 'AM', count: 40 },
                { slot: 'NN', count: 31 },
                { slot: 'PM', count: 56 },
                { slot: '', count: 20 }
            ],
            totalGuests: 1120
        };

        return result;
    }
}
