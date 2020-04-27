import { formatDate } from '@utils/dates';
import { Guest } from 'Api';
import * as faker from 'faker';

export function generateFakeGuest(): Guest {
    return {
        _id: faker.random.uuid(),
        guest: faker.name.findName(),
        volunteer: faker.name.findName(),
        tableNumber: faker.random.number(),
        visitDate: formatDate(faker.date.recent()),
    };
}

export function generateFakeGuests(count: number = 5): Guest[] {
    const guests: Guest[] = [];
    for (let i = 0; i < 5; i++) {
        guests.push(generateFakeGuest());
    }
    return guests;
}
