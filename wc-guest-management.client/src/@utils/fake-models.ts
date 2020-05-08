import { Activity, Slot } from '@models';
import { formatDate } from '@utils/dates';
import {
    AuthResult,
    DashboardMetric,
    DashboardReport,
    Guest,
    InfoSlip,
    Profile,
} from 'Api';
import * as faker from 'faker';

export function generateFakeGuest(): Guest {
    return {
        _id: faker.random.uuid(),
        guest: faker.name.findName(),
        volunteer: faker.name.findName(),
        tableNumber: faker.random.number(),
        visitDate: formatDate(faker.date.recent()),
        series: faker.random.number(),
        age: faker.random.number(80),
        worshipTime: getRandomTimeSlot(),
        worshipDay: getRandomWorshipDay(),
        action: getRandomAction(),
    };
}

export function generateFakeGuests(count: number = 5): Guest[] {
    const guests: Guest[] = [];
    for (let i = 0; i < count; i++) {
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

export function generateFakeProfile(): Profile {
    return {
        name: faker.name.findName(),
        username: faker.random.words(1),
        _id: faker.random.uuid(),
    };
}

export function generateFakeAuthResult(): AuthResult {
    return {
        profile: generateFakeProfile(),
        token: faker.random.alphaNumeric(100),
    };
}

export function getRandomWorshipDay() {
    const days = ['Saturday', 'Sunday'];
    const result = faker.random.arrayElement(days);
    return result;
}

export function getRandomTimeSlot() {
    const slots: Slot[] = ['9 AM', '12 NN', '3 PM', '6 PM'];
    const result = faker.random.arrayElement(slots);
    return result;
}

export function getRandomAction() {
    const actions: Activity[] = ['A', 'Counseled', 'DNA', 'Prayed'];
    const result = faker.random.arrayElement(actions);
    return result;
}

export function generateFakeInfoSlip(guestCount = 1): InfoSlip {
    let guests = '';
    let i = 0;
    while (guestCount !== i) {
        guests += faker.name.findName();
        if (i !== 0) guests += '\n';
        i++;
    }

    return {
        visitDate: formatDate(faker.date.recent(5)),
        volunteer: faker.name.findName(),
        tableNumber: faker.random.number(),
        worshipTime: getRandomTimeSlot(),
        guests: guests,
    };
}
