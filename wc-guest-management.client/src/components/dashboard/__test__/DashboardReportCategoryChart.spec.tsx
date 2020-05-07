import { render } from '@testing-library/react';
import DashboardReportCategoryChart from 'components/dashboard/DashboardReportCategoryChart';
import * as faker from 'faker';
import * as useChartData from 'hooks/useChartData'; //intentionally importing as a module
import React from 'react';

describe('DashboardReportCategoryChart', () => {
    afterEach(() => jest.clearAllMocks());

    it('should render', async () => {
        const mockedChartData = [
            {
                index: '< 20',
                '9 AM': faker.random.number(),
            },
        ];
        const mockedUseChartData = jest.spyOn(useChartData, 'useChartData');
        mockedUseChartData.mockReturnValueOnce({
            keys: ['9 AM'],
            chartData: mockedChartData,
        });
        const { getByRole } = render(
            <DashboardReportCategoryChart data={[]} category="age" />
        );

        expect(getByRole('heading').textContent).toBe('guests by age');
        expect(mockedUseChartData).toHaveBeenCalledTimes(1);
        expect(mockedUseChartData).toHaveBeenCalledWith([]);
    });
});
