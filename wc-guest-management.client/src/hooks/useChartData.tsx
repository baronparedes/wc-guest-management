import { Slot } from '@models';
import { DashboardLineItem } from 'Api';

export function useChartData(data: DashboardLineItem[]) {
    const keys: Slot[] = ['9 AM', '12 NN', '3 PM', '6 PM', 'NA'];
    const getCount = (item: DashboardLineItem, slot: Slot): number => {
        const metric = item.metrics.find((m) => m.slot === slot);
        return metric ? metric.count : 0;
    };
    const chartData = data.map((d) => {
        let result = {};
        keys.forEach((key) => {
            const prop = key.toString();
            result = {
                ...result,
                [prop]: getCount(d, key),
            };
        });
        return {
            ...result,
            index: d.label,
        };
    });
    return {
        chartData,
        keys,
    };
}
