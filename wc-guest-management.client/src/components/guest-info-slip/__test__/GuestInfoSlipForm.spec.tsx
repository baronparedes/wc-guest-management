import { fireEvent, render, RenderResult, waitFor, within } from '@testing-library/react';
import { formatDate, getCurrentDateFormatted, getCurrentTimeSlot } from '@utils/dates';
import { generateFakeGuests, generateFakeInfoSlip } from '@utils/fake-models';
import { TargetInput, TestFormBuilder } from '@utils/test-helpers';
import { renderWithRestful } from '@utils/test-renderers';
import { InfoSlip } from 'Api';
import ConfirmedGuests from 'components/guest-info-slip/ConfirmedGuests';
import GuestInfoSlipForm from 'components/guest-info-slip/GuestInfoSlipForm';
import faker from 'faker';
import nock from 'nock';
import React from 'react';

type ConfirmedGuestsProps = React.ComponentProps<typeof ConfirmedGuests>;

jest.mock(
    'components/guest-info-slip/ConfirmedGuests',
    () => (props: ConfirmedGuestsProps) => {
        return (
            <div>
                <div data-testid="confirmed-guests">{JSON.stringify(props.guests)}</div>
                <div data-testid="confirmed-volunteer">{props.volunteer}</div>
            </div>
        );
    }
);

function buildGuestInfoSlipTargets(infoSlip: InfoSlip) {
    const formBuilder = new TestFormBuilder();
    formBuilder.append('visit date', infoSlip.visitDate, getCurrentDateFormatted(), [
        { invalidValue: '', validationType: 'required' },
        { invalidValue: formatDate(faker.date.future()), validationType: 'max' },
    ]);
    formBuilder.append('time slot', infoSlip.worshipTime as string, getCurrentTimeSlot());
    formBuilder.append('table number', infoSlip.tableNumber?.toString() ?? '', '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    formBuilder.append('volunteer', infoSlip.volunteer, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    formBuilder.append('guests', infoSlip.guests, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    return formBuilder.build();
}

describe('GuestInfoSlipForm', () => {
    const base = 'http://localhost';
    const mockedGuests = generateFakeGuests();
    const mockedGuestInfoSlip = generateFakeInfoSlip();
    const { targetInputs, invalidInputs } = buildGuestInfoSlipTargets(mockedGuestInfoSlip);

    function enterTargetInputs(target: RenderResult) {
        const iterateTargetInputs = (
            cb: (target: TargetInput, input: HTMLInputElement) => void
        ) => {
            targetInputs.forEach((targetInput) => {
                const match = new RegExp(targetInput.label, 'i');
                const input = target.getByLabelText(match) as HTMLInputElement;
                cb(targetInput, input);
            });
        };

        iterateTargetInputs(async (targetInput, input) => {
            fireEvent.change(input, { target: { value: targetInput.value } });
            expect(input.value).toBe(targetInput.value?.toString());
        });

        return {
            iterateTargetInputs,
        };
    }

    async function assertInputValidation(label: string, invalidValue: string) {
        const component = renderWithRestful(<GuestInfoSlipForm />, base);
        const { getByText, getByRole, getByLabelText } = component;
        const form = getByRole('form') as HTMLFormElement;
        enterTargetInputs(component);

        const match = new RegExp(label, 'i');
        fireEvent.change(getByLabelText(match), { target: { value: invalidValue } });
        fireEvent.click(getByText(/submit/i));
        await waitFor(() => expect(form.checkValidity()).toBeFalsy());
    }

    afterEach(() => {
        nock.cleanAll();
        jest.clearAllMocks();
    });

    invalidInputs.forEach((invalidInput) => {
        it(invalidInput.description, async () => {
            await assertInputValidation(invalidInput.label, invalidInput.invalidValue);
        });
    });

    it('should render', () => {
        const { getByText } = render(<GuestInfoSlipForm />);
        expect(getByText(/clear/i, { selector: 'button' })).toBeInTheDocument();
        expect(getByText(/submit/i, { selector: 'button' })).toBeInTheDocument();

        const info = getByText(/you can write multiple guests in each line/i);
        const infoContainer = info.parentNode as HTMLElement;

        expect(info).toBeInTheDocument();
        expect(within(infoContainer).getByText(/^guests$/i)).toBeInTheDocument();
    });

    it('should reset the form when clear button is clicked', async () => {
        const component = renderWithRestful(<GuestInfoSlipForm />, base);
        const { getByText } = component;
        const { iterateTargetInputs } = enterTargetInputs(component);

        fireEvent.click(getByText(/clear/i));
        iterateTargetInputs((targetInput, input) => {
            expect(input.value).toBe(targetInput.initialState);
        });
    });

    it('should submit the form when submit button is clicked', async () => {
        // the order of the fields in UI should match the mocked body
        // spread operator will mess the order
        const body = {
            print: false,
            infoSlip: {
                visitDate: mockedGuestInfoSlip.visitDate,
                worshipTime: mockedGuestInfoSlip.worshipTime,
                tableNumber: mockedGuestInfoSlip.tableNumber?.toString(),
                volunteer: mockedGuestInfoSlip.volunteer,
                guests: mockedGuestInfoSlip.guests,
            },
        };
        nock(base).post('/api/guest/welcome', body).reply(200, mockedGuests);

        const component = renderWithRestful(<GuestInfoSlipForm />, base);
        const { getByText, getByRole, getByTestId } = component;
        const form = getByRole('form') as HTMLFormElement;
        enterTargetInputs(component);

        fireEvent.click(getByText(/submit/i));
        await waitFor(() => expect(form.checkValidity()).toBeTruthy());
        await waitFor(() =>
            expect(getByTestId('confirmed-guests').textContent).toBe(
                JSON.stringify(mockedGuests)
            )
        );
        await waitFor(() =>
            expect(getByTestId('confirmed-volunteer').textContent).toBe(
                mockedGuestInfoSlip.volunteer
            )
        );
    });
});
