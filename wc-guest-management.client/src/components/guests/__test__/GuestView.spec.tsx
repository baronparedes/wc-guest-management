import { render } from '@testing-library/react';
import GuestView from 'components/guests/GuestView';
import React from 'react';

jest.mock('components/guests/GuestsContainer', () => () => {
    return <div>guest-continer</div>;
});

describe('GuestView', () => {
    it('should render', () => {
        const { getByText } = render(<GuestView />);
        expect(getByText(/guests/i)).toBeInTheDocument();
        expect(getByText(/guest-continer/i)).toBeInTheDocument();
    });
});
