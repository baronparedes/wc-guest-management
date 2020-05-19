import * as faker from 'faker';
import { Guest, GuestModel } from '../../@models/guest';
import { InfoSlip, Slot } from '../../@types/models';
import { formatDate, getCurrentDateFormatted, getPreviousDate } from '../../@utils/dates';
import { generateFakeGuest, generateFakeInfoSlip } from '../../@utils/fake-models';
import { startDb, stopDb } from '../../@utils/test-helper';
import GuestService from '../guest-service';

describe('GuestService', () => {
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
        const results: Guest[][] = [];
        for (let info of infoSlips) {
            const result = await target.welcomeGuests(info);
            results.push(result);
        }
        return results;
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

    function assertGuestResults(actual: Guest[], expected: Guest[]) {
        actual.forEach((a) => {
            const e = expected.find((_) => _.guest === a.guest);
            if (!e) {
                fail(`${a.guest} was not found in list of expected guests.`);
            }
            assertGuest(a, e);
        });
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

    it('should be able to update guest data', async () => {
        const guestData = generateFakeGuest();
        const seed = await GuestModel.create(guestData);
        const updatedGuest: Guest = generateFakeGuest();
        updatedGuest._id = seed._id;
        const target = new GuestService();
        const actual = await target.updateGuest(seed._id, updatedGuest);
        assertGuest(actual, updatedGuest);
    });

    describe('should be able to log welcomed guests', () => {
        it('when valid guests', async () => {
            const expectedCount = 2;
            const data = generateFakeInfoSlip(expectedCount);
            const target = new GuestService();
            const actual = await target.welcomeGuests(data);
            expect(actual.length).toBe(expectedCount);
            actual.forEach((a) => {
                assertInfoSlip(a, data);
            });
        });

        it('when invalid guests', async () => {
            const data = {
                ...generateFakeInfoSlip(1),
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
            const expectedCount = 2;
            const data = {
                ...generateFakeInfoSlip(expectedCount),
                visitDate: getCurrentDateFormatted(),
            };
            const target = new GuestService();
            await target.welcomeGuests(data);
            const actual = await target.fetchGuests();
            expect(actual.length).toBe(expectedCount);
            actual.forEach((a) => {
                assertInfoSlip(a, data);
            });
        });

        it.each`
            category      | index             | activity       | age
            ${'age'}      | ${'<=20'}         | ${undefined}   | ${faker.random.number({ min: 1, max: 20 })}
            ${'age'}      | ${'21-30'}        | ${undefined}   | ${faker.random.number({ min: 21, max: 30 })}
            ${'age'}      | ${'31-40'}        | ${undefined}   | ${faker.random.number({ min: 31, max: 40 })}
            ${'age'}      | ${'41-50'}        | ${undefined}   | ${faker.random.number({ min: 41, max: 50 })}
            ${'age'}      | ${'>50'}          | ${undefined}   | ${faker.random.number({ min: 51, max: 120 })}
            ${'activity'} | ${'Accepted'}     | ${'A'}         | ${undefined}
            ${'activity'} | ${'Not Accepted'} | ${'DNA'}       | ${undefined}
            ${'activity'} | ${'Counseled'}    | ${'Counseled'} | ${undefined}
            ${'activity'} | ${'Prayed'}       | ${'Prayed'}    | ${undefined}
        `(
            `by dashboard $category category - $index`,
            async ({ category, index, activity, age }) => {
                const recent = faker.date.recent(faker.random.number(10));
                const expectedCount = 5;
                const slot = '9 AM';
                const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                    { count: expectedCount, visitDate: formatDate(recent) },
                    { count: 10, visitDate: formatDate(recent) },
                    { count: 10, visitDate: formatDate(recent) }
                );
                infoSlip2.worshipTime = '12 NN';
                infoSlip3.worshipTime = '3 PM';

                const target = new GuestService();
                const [seeds] = await welcomeGuests(
                    target,
                    infoSlip1,
                    infoSlip2,
                    infoSlip3
                );
                const expected: Guest[] = [];

                for (let seed of seeds) {
                    const updatedGuest: Guest = {
                        ...generateFakeGuest(),
                        _id: seed._id,
                        visitDate: seed.visitDate,
                        age: age,
                        action: activity,
                        worshipTime: slot,
                    };
                    const result = await target.updateGuest(seed._id, updatedGuest);
                    expected.push(result);
                }

                const actual = await target.fetchGuestsByCategory(
                    new Date(formatDate(recent)),
                    new Date(getCurrentDateFormatted()),
                    category,
                    index,
                    slot
                );
                expect(actual.length).toBe(expectedCount);
                assertGuestResults(actual, expected);
            }
        );

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
            const [expected] = await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);
            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                undefined,
                slot
            );
            expect(actual.length).toBe(expectedCount);
            assertGuestResults(actual, expected);
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
            const [expected] = await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                infoSlip1.guests
            );
            expect(actual.length).toBe(expectedCount);
            assertGuestResults(actual, expected);
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
            const [expected] = await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                infoSlip1.volunteer
            );
            expect(actual.length).toBe(expectedCount);
            assertGuestResults(actual, expected);
        });

        it('by visit date and by series', async () => {
            const recent = faker.date.recent(faker.random.number(10));
            const expectedCount = 1;
            const [infoSlip1, infoSlip2, infoSlip3] = generateInfoSlips(
                { count: expectedCount, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) },
                { count: 10, visitDate: formatDate(recent) }
            );
            const target = new GuestService();
            const [expected] = await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(
                new Date(formatDate(recent)),
                undefined,
                expected[0].series?.toString()
            );
            expect(actual.length).toBe(expectedCount);
            assertGuestResults(actual, expected);
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
            const [expected] = await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);

            const actual = await target.fetchGuests(new Date(formatDate(recent)));
            expect(actual.length).toBe(expectedCount);
            assertGuestResults(actual, expected);
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
            const [e1, e2] = await welcomeGuests(target, infoSlip1, infoSlip2, infoSlip3);
            const expected = [...e1, ...e2];

            const actual = await target.fetchGuests(fiveDaysAgo, new Date());
            expect(actual.length).toBe(expectedCount);
            assertGuestResults(actual, expected);
        });
    });
});
