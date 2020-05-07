import { render, within } from '@testing-library/react';
import { generateFakeGuests, getRandomTimeSlot } from '@utils/fake-models';
import { Guest } from 'Api';
import GuestListArea from 'components/guests/GuestListArea';
import faker from 'faker';
import React from 'react';

describe('GuestListArea', () => {
    function assertGuestInCardContainer(
        cardContainer: HTMLElement,
        targetGuests: Guest[],
        matchTableNumber: RegExp
    ) {
        const volunteer = targetGuests[0].volunteer;
        expect(within(cardContainer).getByText(volunteer)).toBeInTheDocument();
        targetGuests.forEach((g) => {
            const series = g.series?.toString() ?? '';
            expect(series).not.toBe('');
            expect(within(cardContainer).getByText(g.guest)).toBeInTheDocument();
            expect(within(cardContainer).getByText(series)).toBeInTheDocument();
            expect(within(cardContainer).getByText(matchTableNumber)).toBeInTheDocument();
        });
    }

    it('should render when having multiple tables with differnt slots', () => {
        const guests = generateFakeGuests(4);
        const tableNumbers = [...new Set(guests.map((g) => g.tableNumber))];
        const { getByText } = render(<GuestListArea guests={guests} />);

        tableNumbers.forEach((tableNumber) => {
            const matchTableNumber = new RegExp(`^table ${tableNumber}`, 'i');
            const cardContainer = getByText(matchTableNumber).parentElement
                ?.parentElement as HTMLElement;
            const targetGuests = guests.filter((g) => g.tableNumber === tableNumber);
            assertGuestInCardContainer(cardContainer, targetGuests, matchTableNumber);
        });
    });
    it('should render when having multiple tables with same slots', () => {
        const slot1 = getRandomTimeSlot();
        const slot2 = getRandomTimeSlot();
        const tableNumber = faker.random.number();
        const guests = generateFakeGuests(4).map((g) => {
            return {
                ...g,
                tableNumber,
            };
        });
        guests[0].worshipTime = slot1;
        guests[1].worshipTime = slot1;
        guests[2].worshipTime = slot2;
        guests[3].worshipTime = slot2;

        const { getByText } = render(<GuestListArea guests={guests} />);

        [slot1, slot2].forEach((slot) => {
            const matchTableNumber = new RegExp(`^table ${tableNumber}`, 'i');
            const cardContainer = getByText(slot).parentElement?.parentElement
                ?.parentElement as HTMLElement;
            const targetGuests = guests.filter((g) => g.worshipTime === slot);
            assertGuestInCardContainer(cardContainer, targetGuests, matchTableNumber);
        });
    });
});
