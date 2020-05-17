import { Guest } from '@models/guest';
import * as faker from 'faker';
import { Activity, InfoSlip, Slot } from '../@types/models';
import { formatDate } from './dates';

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

export function generateFakeInfoSlip(guestCount = 1, visitDate?: string): InfoSlip {
    let guests = '';
    let i = 0;
    while (guestCount !== i) {
        if (i !== 0) guests += '\n';
        guests += faker.name.findName();
        i++;
    }

    return {
        visitDate: visitDate ?? formatDate(faker.date.recent(5)),
        volunteer: faker.name.findName(),
        tableNumber: faker.random.number(),
        worshipTime: getRandomTimeSlot(),
        guests: guests,
    };
}

export function generateFakeGuest(): Guest {
    const guest: Guest = {
        visitDate: faker.date.recent(),
        guest: faker.name.findName(),
        volunteer: faker.name.findName(),
        tableNumber: faker.random.number(),
        series: faker.random.number(),
        worshipDay: 'Sunday',
        worshipTime: getRandomTimeSlot(),
        createdDate: faker.date.recent(),
    };
    return guest;
}
