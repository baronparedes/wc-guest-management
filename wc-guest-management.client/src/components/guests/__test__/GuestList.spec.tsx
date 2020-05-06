import { fireEvent, render } from '@testing-library/react';
import { generateFakeGuests } from '@utils/fake-models';
import { Guest } from 'Api';
import GuestList from 'components/guests/GuestList';
import React from 'react';

type Props = {
    guests: Guest[];
};

jest.mock('components/guests/GuestListArea', () => ({ guests }: Props) => {
    return <div data-testid="guest-list-area">{JSON.stringify(guests)}</div>;
});

jest.mock('components/guests/GuestListTable', () => ({ guests }: Props) => {
    return <div data-testid="guest-list-table">{JSON.stringify(guests)}</div>;
});

describe('GuestList', () => {
    const mockedGuests = generateFakeGuests(2);

    afterEach(() => jest.clearAllMocks());

    it('should render', () => {
        const { getByText } = render(
            <GuestList guests={[]} areaToggle={false} onAreaToggle={jest.fn} />
        );
        expect(getByText(/no guests found/i)).toBeInTheDocument();
    });

    it('should invoke toggle on change', () => {
        const handleAreaToggle = jest.fn();
        const { getByLabelText } = render(
            <GuestList
                guests={mockedGuests}
                areaToggle={false}
                onAreaToggle={handleAreaToggle}
            />
        );

        const areaViewSwitch = getByLabelText(/by area/i) as HTMLInputElement;
        fireEvent.click(areaViewSwitch);
        fireEvent.click(areaViewSwitch);
        expect(handleAreaToggle).toBeCalledTimes(2);
    });

    it.each`
        toggle   | description | componentTestId
        ${true}  | ${'on'}     | ${'guest-list-area'}
        ${false} | ${'off'}    | ${'guest-list-table'}
    `(
        'should render an area view switch toggled $description',
        ({ toggle, componentTestId }) => {
            const { getByLabelText, getByTestId } = render(
                <GuestList
                    guests={mockedGuests}
                    areaToggle={toggle}
                    onAreaToggle={jest.fn}
                />
            );

            const areaViewSwitch = getByLabelText(/by area/i) as HTMLInputElement;
            expect(areaViewSwitch).toBeInTheDocument();
            expect(areaViewSwitch.checked).toBe(toggle);
            expect(getByTestId(componentTestId).textContent).toBe(
                JSON.stringify(mockedGuests)
            );
        }
    );
});
