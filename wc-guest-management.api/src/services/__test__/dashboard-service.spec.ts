import * as faker from 'faker';
import { Guest } from '../../@models/guest';
import { generateFakeGuest } from '../../@utils/fake-models';
import DashboardService from '../dashboard-service';

describe('DashboardService', () => {
    type ExpectedCriteriaProp = {
        label: string;
        g: Guest;
    };

    function getExpectedAgeCriterias() {
        const guest = generateFakeGuest();
        const expected: ExpectedCriteriaProp[] = [
            {
                label: '<=20',
                g: { ...guest, age: faker.random.number({ min: 1, max: 20 }) },
            },
            {
                label: '21-30',
                g: { ...guest, age: faker.random.number({ min: 21, max: 30 }) },
            },
            {
                label: '31-40',
                g: { ...guest, age: faker.random.number({ min: 31, max: 40 }) },
            },
            {
                label: '41-50',
                g: { ...guest, age: faker.random.number({ min: 41, max: 50 }) },
            },
            {
                label: '>50',
                g: { ...guest, age: faker.random.number({ min: 51, max: 120 }) },
            },
            {
                label: 'na',
                g: { ...guest, age: undefined },
            },
        ];
        return expected;
    }

    function getExpectedActivityCriterias() {
        const guest = generateFakeGuest();
        const expected: ExpectedCriteriaProp[] = [
            {
                label: 'accepted',
                g: { ...guest, action: 'A' },
            },
            {
                label: 'not accepted',
                g: { ...guest, action: 'DNA' },
            },
            {
                label: 'prayed',
                g: { ...guest, action: 'Prayed' },
            },
            {
                label: 'counseled',
                g: { ...guest, action: 'Counseled' },
            },
            {
                label: 'na',
                g: { ...guest, action: undefined },
            },
        ];
        return expected;
    }

    it.each`
        category      | expected
        ${'age'}      | ${getExpectedAgeCriterias()}
        ${'activity'} | ${getExpectedActivityCriterias()}
    `('should have correct criterias by $category category', ({ category, expected }) => {
        const target = new DashboardService();
        const actual = target.getCriterias(category);

        actual.forEach((a) => {
            const expectedCriteria = expected.find(
                (e: ExpectedCriteriaProp) => e.label === a.label
            );
            if (!expectedCriteria) fail(`Expected criteria not found for ${a.label}`);
            expect(a.label).toBe(expectedCriteria.label);
            expect(a.criteria(expectedCriteria.g)).toBeTruthy();
        });
    });
});
