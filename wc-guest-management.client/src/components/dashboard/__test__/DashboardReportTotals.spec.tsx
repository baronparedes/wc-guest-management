import { render } from '@testing-library/react';
import { DashboardReport } from 'Api';
import DashboardReportTotals from 'components/dashboard/DashboardReportTotals';
import * as faker from 'faker';
import React from 'react';

const mockDashboardReportGuestDetail = 'mocked-dashboard-report-guest-detail';
jest.mock('components/dashboard/DashboardReportGuestDetail', () => () => {
    return <div>{mockDashboardReportGuestDetail}</div>;
});

describe('DashboardReportTotals', () => {
    it('should render', () => {
        const data: DashboardReport = {
            totalGuests: faker.random.number(),
            categories: [],
            summary: [
                { count: faker.random.number(), slot: '9 AM' },
                { count: faker.random.number(), slot: '12 NN' },
                { count: faker.random.number(), slot: '3 PM' },
                { count: faker.random.number(), slot: '6 PM' },
            ],
        };
        const { debug, getByText, getByTestId } = render(
            <DashboardReportTotals data={data} />
        );

        expect(getByText(/total guests/i)).toBeInTheDocument();
        expect(getByTestId(/total guests/i).textContent).toBe(data.totalGuests.toString());

        data.summary.forEach((item) => {
            const regex = new RegExp(item.slot, 'i');
            expect(getByText(regex)).toBeInTheDocument();
            expect(getByTestId(regex).textContent).toBe(item.count.toString());
        });

        expect(getByText(mockDashboardReportGuestDetail)).toBeInTheDocument();
    });
});
