import { formatDate } from '@utils/dates';
import { DashboardMetric, DashboardReport, Guest } from 'Api';
import * as faker from 'faker';

export function generateFakeGuest(): Guest {
    return {
        _id: faker.random.uuid(),
        guest: faker.name.findName(),
        volunteer: faker.name.findName(),
        tableNumber: faker.random.number(),
        visitDate: formatDate(faker.date.recent()),
        series: faker.random.number(),
    };
}

export function generateFakeGuests(count: number = 5): Guest[] {
    const guests: Guest[] = [];
    for (let i = 0; i < 5; i++) {
        guests.push(generateFakeGuest());
    }
    return guests;
}

export function generateFakeDashboardMetrics(): DashboardMetric[] {
    return [
        { count: faker.random.number(), slot: '9 AM' },
        { count: faker.random.number(), slot: '12 NN' },
        { count: faker.random.number(), slot: '3 PM' },
        { count: faker.random.number(), slot: '6 PM' },
    ];
}

export function generateFakeDashboardReport(): DashboardReport {
    return {
        totalGuests: faker.random.number(),
        summary: generateFakeDashboardMetrics(),
        categories: [
            {
                title: 'age',
                metrics: [
                    {
                        label: faker.random.words(1),
                        metrics: generateFakeDashboardMetrics(),
                    },
                ],
            },
            {
                title: 'activity',
                metrics: [
                    {
                        label: faker.random.words(1),
                        metrics: generateFakeDashboardMetrics(),
                    },
                ],
            },
        ],
    };
}
