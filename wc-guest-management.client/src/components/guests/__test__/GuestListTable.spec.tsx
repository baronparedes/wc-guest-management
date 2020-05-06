import { render, within } from '@testing-library/react';
import { generateFakeGuests } from '@utils/fake-models';
import GuestListTable from 'components/guests/GuestListTable';
import React from 'react';

describe('GuestListTable', () => {
    const mockedGuests = generateFakeGuests();

    it('should render', () => {
        const { getByText, debug } = render(<GuestListTable guests={mockedGuests} />);
        const headerRow = getByText(/^id$/i).parentElement as HTMLElement;
        expect(within(headerRow).getByText(/table/i)).toBeInTheDocument();
        expect(within(headerRow).getByText(/guest/i)).toBeInTheDocument();
        expect(within(headerRow).getByText(/volunteer/i)).toBeInTheDocument();
        mockedGuests.forEach((g) => {
            const series = g.series ? g.series.toString() : '';
            const match = new RegExp(`^${series}$`);
            const guestRow = getByText(match).parentElement as HTMLElement;

            expect(series).not.toBe('');
            expect(
                within(guestRow).getByText(g.tableNumber.toString())
            ).toBeInTheDocument();
            expect(within(guestRow).getByText(g.guest)).toBeInTheDocument();
            expect(within(guestRow).getByText(g.volunteer)).toBeInTheDocument();
            expect(within(guestRow).getByTitle(/^guest data$/i)).toBeInTheDocument();
            expect(
                within(guestRow).getByTitle(/^guest essential data$/i)
            ).toBeInTheDocument();
        });
    });
});
