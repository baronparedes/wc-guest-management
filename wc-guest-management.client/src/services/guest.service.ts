import { Models } from '../@types/models';
import { getCurrentDateFormatted } from '../@utils/dates';
import { guestMetadataService } from './guest-metadata.service';

const timeout = 1000;
const today = getCurrentDateFormatted();
let guests: Models.GuestInfo[] = [
    {
        id: 1,
        tableNumber: 1,
        guest: 'John Doe',
        volunteer: 'Baron Paredes',
        visitDate: today
    },
    {
        id: 2,
        tableNumber: 2,
        guest: 'George Washington',
        volunteer: 'Baron Paredes',
        visitDate: today
    },
    {
        id: 3,
        tableNumber: 3,
        guest: 'Pedro Juan',
        volunteer: 'Baron Paredes',
        visitDate: today
    },
    {
        id: 4,
        tableNumber: 4,
        guest: 'Foo Fighter',
        volunteer: 'Baron Paredes',
        visitDate: today
    }
];
let nextId = guests.length;

const get = async () => {
    return new Promise<Models.GuestInfo[]>(resolve => {
        setTimeout(() => {
            resolve(guests);
        }, timeout);
    });
};

const splitInfoSlip = (infoSlip: Models.InfoSlip) => {
    const result = [] as Models.GuestInfo[];
    if (infoSlip.guests) {
        const guests = infoSlip.guests.split(/\n/);
        guests.forEach(g => {
            result.push({
                ...infoSlip,
                id: nextId,
                guest: g,
                tableNumber: infoSlip.tableNumber
                    ? infoSlip.tableNumber
                    : 0
            });
            nextId++;
        });
    }
    return result;
};

const addGuest = async (infoSlip: Models.InfoSlip) => {
    return new Promise<Models.GuestInfo[]>(resolve => {
        setTimeout(() => {
            const data = splitInfoSlip(infoSlip);
            guests = guests.concat(data);
            resolve(data);
        }, timeout);
    });
};

const print = async (id: number) => {
    return new Promise<boolean>(resolve => {
        setTimeout(() => {
            const info = guests.find(_ => _.id === id);
            if (info) {
                const metadata: Models.GuestMetadata = {
                    ...info
                };
                guestMetadataService.push(metadata);
                guests = guests.filter(_ => _.id !== id);
            }
            resolve(true);
        }, timeout);
    });
};

export const guestService = {
    get,
    print,
    addGuest
};
