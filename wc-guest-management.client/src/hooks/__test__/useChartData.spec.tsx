import { Slot } from '@models';
import { renderHook } from '@testing-library/react-hooks';
import { DashboardLineItem } from 'Api';
import * as faker from 'faker';
import { useChartData } from 'hooks/useChartData';

describe('useChartData', () => {
    it('should render', () => {
        const data: DashboardLineItem[] = [];
        renderHook(() => useChartData(data));
    });

    it('should translate to chart data', () => {
        const data: DashboardLineItem[] = [
            {
                label: faker.lorem.word(),
                metrics: [
                    {
                        count: faker.random.number(),
                        slot: '9 AM',
                    },
                    {
                        count: faker.random.number(),
                        slot: '12 NN',
                    },
                    {
                        count: faker.random.number(),
                        slot: '3 PM',
                    },
                    {
                        count: faker.random.number(),
                        slot: '6 PM',
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useChartData(data));

        let i = 0;
        data.forEach((item) => {
            expect(result.current.chartData[i].index).toBe(item.label);
            item.metrics.forEach((metric) => {
                expect((result.current.chartData[i] as any)[metric.slot]).toBe(
                    metric.count
                );
            });
            i++;
        });

        const expectedKeys: Slot[] = ['9 AM', '12 NN', '3 PM', '6 PM'];
        expectedKeys.forEach((key) => {
            expect(result.current.keys).toContain(key);
        });
    });
});
