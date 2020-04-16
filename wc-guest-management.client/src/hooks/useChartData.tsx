import { Slot } from '@models';
import { DashboardLineItem } from 'Api';

export default function useChartData(data: DashboardLineItem[]) {
    const keys: Slot[] = ['9 AM', '12 NN', '3 PM', '6 PM', 'NA'];
    const chartData = data.map((d) => {
        const getCount = (item: DashboardLineItem, slot: Slot): number => {
            const metric = item.metrics.find((m) => m.slot === slot);
            return metric ? metric.count : 0;
        };
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
