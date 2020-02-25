import { Models } from '../@types/models';
const timeout = 1000;
let list: Models.GuestMetadata[] = [];

const get = async (criteria: string, targetDate: Date) => {
    return new Promise<Models.GuestMetadata[]>(resolve => {
        setTimeout(() => {
            resolve(list);
        }, timeout);
    });
};

const push = (guestMetadata: Models.GuestMetadata) => {
    list.push(guestMetadata);
};

export const guestMetadataService = {
    get,
    push
};
