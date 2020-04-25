import { renderHook } from '@testing-library/react-hooks';
import { DashboardLineItem } from 'Api';
import { useChartData } from 'hooks/useChartData';

describe('useChartData', () => {
    it('should load', () => {
        const data: DashboardLineItem[] = [];
        renderHook(() => useChartData(data));
    });

    it('should translate to chart data', () => {
        const data: DashboardLineItem[] = [
            {
                label: 'test-label',
                metrics: [
                    {
                        count: 100,
                        slot: '9 AM',
                    },
                    {
                        count: 90,
                        slot: '12 NN',
                    },
                    {
                        count: 80,
                        slot: '3 PM',
                    },
                    {
                        count: 70,
                        slot: '6 PM',
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useChartData(data));

        expect(result.current.chartData[0].index).toBe('test-label');
        expect((result.current.chartData[0] as any)['9 AM']).toBe(100);
        expect((result.current.chartData[0] as any)['12 NN']).toBe(90);
        expect((result.current.chartData[0] as any)['3 PM']).toBe(80);
        expect((result.current.chartData[0] as any)['6 PM']).toBe(70);
        expect(result.current.keys).toContain('9 AM');
        expect(result.current.keys).toContain('12 NN');
        expect(result.current.keys).toContain('3 PM');
        expect(result.current.keys).toContain('6 PM');
        expect(result.current.keys).toContain('NA');
    });
});
