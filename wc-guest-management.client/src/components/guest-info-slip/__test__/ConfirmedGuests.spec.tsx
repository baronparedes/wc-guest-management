import { fireEvent, render } from '@testing-library/react';
import { generateFakeGuests } from '@utils/fake-models';
import ConfirmedGuests from 'components/guest-info-slip/ConfirmedGuests';
import faker from 'faker';
import React from 'react';

type Props = React.ComponentProps<typeof ConfirmedGuests>;

describe('ConfirmedGuests', () => {
    it('should render', () => {
        const props: Props = {
            guests: generateFakeGuests(),
            volunteer: faker.name.findName(),
            ok: jest.fn(),
        };
        const { getByText } = render(<ConfirmedGuests {...props} />);

        expect(getByText(/thank you/i)).toBeInTheDocument();
        expect(getByText(props.volunteer)).toBeInTheDocument();
        expect(getByText(/guests has been queued/i)).toBeInTheDocument();

        props.guests.forEach((g) => {
            expect(getByText(g.guest)).toBeInTheDocument();
        });

        fireEvent.click(getByText(/start over/i));
        expect(props.ok).toBeCalledTimes(1);
    });
});
