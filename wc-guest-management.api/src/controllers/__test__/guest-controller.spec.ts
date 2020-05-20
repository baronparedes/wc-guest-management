import * as faker from 'faker';
import { ReportCategory } from '../../@types/models';
import { generateFakeGuest, getRandomTimeSlot } from '../../@utils/fake-models';
import GuestService from '../../services/guest-service';
import { GuestController } from '../guest-controller';

describe('GuestController', () => {
    it('should be able to fetch guests', async () => {
        const now = new Date();
        const criteria = faker.random.word();
        const slot = getRandomTimeSlot();
        const guests = [generateFakeGuest()];

        const fetchGuestSpy = jest
            .spyOn(GuestService.prototype, 'fetchGuests')
            .mockReturnValueOnce(new Promise((resolve) => resolve(guests)));

        const target = new GuestController();
        const actual = await target.fetchGuests(now, now, criteria, slot);

        expect(fetchGuestSpy).toBeCalledTimes(1);
        expect(fetchGuestSpy).toBeCalledWith(now, now, criteria, slot);
        expect(actual).toStrictEqual(guests);
    });

    it('should be able to fetch guests by category', async () => {
        const now = new Date();
        const criteria = faker.random.word();
        const category: ReportCategory = faker.random.arrayElement(['age', 'activity']);
        const slot = getRandomTimeSlot();
        const index = faker.random.word();
        const guests = [generateFakeGuest()];

        const fetchGuestsByCategorySpy = jest
            .spyOn(GuestService.prototype, 'fetchGuestsByCategory')
            .mockReturnValueOnce(new Promise((resolve) => resolve(guests)));

        const target = new GuestController();
        const actual = await target.fetchGuestsByCategory(category, slot, index, now, now);

        expect(fetchGuestsByCategorySpy).toBeCalledTimes(1);
        expect(fetchGuestsByCategorySpy).toBeCalledWith(now, now, category, index, slot);
        expect(actual).toStrictEqual(guests);
    });

    it('should be able to update guests', async () => {
        const id = faker.random.uuid();
        const guest = generateFakeGuest();

        const updateGuestSpy = jest
            .spyOn(GuestService.prototype, 'updateGuest')
            .mockReturnValueOnce(new Promise((resolve) => resolve(guest)));

        const target = new GuestController();
        const actual = await target.updateGuestData(id, guest);

        expect(updateGuestSpy).toBeCalledTimes(1);
        expect(updateGuestSpy).toBeCalledWith(id, guest);
        expect(actual).toStrictEqual(guest);
    });
});
