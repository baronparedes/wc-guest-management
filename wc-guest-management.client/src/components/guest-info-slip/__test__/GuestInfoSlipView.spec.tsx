import { render } from '@testing-library/react';
import GuestInfoSlipView from 'components/guest-info-slip/GuestInfoSlipView';
import React from 'react';

jest.mock('components/guest-info-slip/GuestInfoSlipForm', () => () => {
    return <div>guest-info-slip-form</div>;
});

describe('GuestInfoSlipView', () => {
    it('should render', () => {
        const { getByText, queryAllByAltText } = render(<GuestInfoSlipView />);
        expect(queryAllByAltText('brand')[0]).toHaveClass('img-fluid');
        expect(queryAllByAltText('brand')[1]).not.toHaveClass('img-fluid');
        expect(getByText(/guest-info-slip-form/i)).toBeInTheDocument();
    });
});
