import * as faker from 'faker';
import { Guest, GuestModel } from '../../@models/guest';
import { InfoSlip, Slot } from '../../@types/models';
import { formatDate, getCurrentDateFormatted, getPreviousDate } from '../../@utils/dates';
import { generateFakeGuest, generateFakeInfoSlip } from '../../@utils/fake-models';
import { startDb, stopDb } from '../../@utils/test-helper';
import GuestService from '../guest-service';

describe('GuestService', () => {
    const guestCount = 2;
    const mockedInfoSlip = generateFakeInfoSlip(guestCount);
    async function seedData() {
        const seed = generateFakeGuest();
        const guest = await GuestModel.create(seed);
        return guest;
    }

    afterEach(async () => {
        await GuestModel.deleteMany({});
    });

    beforeAll(async () => {
        await startDb();
    });

    afterAll(async () => {
        await stopDb();
    });

    function assertGuest(a: Guest, e: Guest) {
        expect(a._id).toBeDefined();
        expect(a.tableNumber).toBe(e.tableNumber);
        expect(a.visitDate).toStrictEqual(e.visitDate);
        expect(a.volunteer).toBe(e.volunteer);
        expect(a.guest).toBe(e.guest);
        expect(a.series).toBe(e.series);
        expect(a.worshipDay).toBe(e.worshipDay);
        expect(a.worshipTime).toBe(e.worshipTime);
        expect(a.createdDate).toStrictEqual(e.createdDate);
    }

    function assertInfoSlip(a: Guest, e: InfoSlip) {
        expect(a._id).toBeDefined();
        expect(a.tableNumber).toBe(e.tableNumber);
        expect(formatDate(a.visitDate)).toBe(e.visitDate);
        expect(a.worshipTime).toBe(e.worshipTime);
        expect(a.volunteer).toBe(e.volunteer);
        expect(e.guests).toMatch(new RegExp(a.guest, 'i'));
    }

    async function welcomeGuests(target: GuestService, ...infoSlips: InfoSlip[]) {
        for (let info of infoSlips) {
            await target.welcomeGuests(info);
        }
    }

    type InfoSlipProps = {
        count: number;
        visitDate: string;
    };

    function generateInfoSlips(...props: InfoSlipProps[]): InfoSlip[] {
        return props.map((p) => {
            const infoSlip: InfoSlip = {
                ...generateFakeInfoSlip(p.count, p.visitDate),
            };
            return infoSlip;
        });
    }

    it('should be able to update guest data', async () => {
        const seed = await seedData();
        const updatedGuest: Guest = generateFakeGuest();
        updatedGuest._id = seed._id;
        const target = new GuestService();
        const actual = await target.updateGuest(seed._id, updatedGuest);
        assertGuest(actual, updatedGuest);
    });

    describe('should be able to log welcomed guests', () => {
        it('when valid guests', async () => {
            const target = new GuestService();
            const actual = await target.welcomeGuests(mockedInfoSlip);
            expect(actual.length).toBe(guestCount);
            actual.forEach((a) => {
                assertInfoSlip(a, mockedInfoSlip);
            });
        });

        it('when invalid guests', async () => {
            const data = {
                ...mockedInfoSlip,
                guests: '',
            };
            const target = new GuestService();
            await expect(target.welcomeGuests(data)).rejects.toThrowError(
                'Guest name(s) must be provided.'
            );
        });
    });

    describe('should be able to fetch all guests', () => {
        it('all', async () => {
            const data = { ...mockedInfoSlip, visitDate: getCurrentDateFormatted() };
            const target = new GuestService();
            await target.welcomeGuests(data);
            const actual = await target.fetchGuests();
            expect(actual.length).toBe(guestCount);
            actual.forEach((a) => {
                assertInfoSlip(a, data);
            });
        });

        it('by visit date and by slot', async () => {
            const recent = faker.date.recent(faker.random.number(10));
            const expectedCount = 5;
            const slot: Slot = '12 NN';
            const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                { count: expectedCount, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) }
            );
            infoSlip1.worshipTime = slot;
            infoSlip2.worshipTime = '9 AM';
            infoSlip3.worshipTime = '3 PM';

            const target = new GuestService();
            await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                undefined,
                slot
            );
            expect(actual.length).toBe(expectedCount);
        });

        it('by visit date and by guest', async () => {
            const recent = faker.date.recent(faker.random.number(10));
            const expectedCount = 1;
            const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                { count: expectedCount, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) }
            );
            const target = new GuestService();
            await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                infoSlip1.guests
            );
            expect(actual.length).toBe(expectedCount);
        });

        it('by visit date and by volunteer', async () => {
            const recent = faker.date.recent(faker.random.number(10));
            const expectedCount = 5;
            const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                { count: expectedCount, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) }
            );
            const target = new GuestService();
            await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                infoSlip1.volunteer
            );
            expect(actual.length).toBe(expectedCount);
        });

        it('by visit date - recently', async () => {
            const recent = faker.date.recent(faker.random.number(10));
            const expectedCount = 5;
            const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                { count: expectedCount, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(faker.date.past()) },
                { count: 10, visitDate: formatDate(faker.date.past()) }
            );
            const target = new GuestService();
            await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(new Date(formatDate(recent)));
            expect(actual.length).toBe(expectedCount);
        });

        it('by visit date - last 5 days up to today', async () => {
            let fiveDaysAgo = getPreviousDate(5);
            const expectedCount = 5;
            const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                { count: 2, visitDate: formatDate(faker.date.recent(3)) },
                { count: 3, visitDate: formatDate(faker.date.recent(4)) },
                { count: 10, visitDate: formatDate(faker.date.past()) }
            );
            const target = new GuestService();
            await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(fiveDaysAgo, new Date());
            expect(actual.length).toBe(expectedCount);
        });
    });
});
