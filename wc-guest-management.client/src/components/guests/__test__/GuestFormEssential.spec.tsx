import { fireEvent, waitFor } from '@testing-library/react';
import { generateFakeGuest } from '@utils/fake-models';
import { TestFormBuilder } from '@utils/test-helpers';
import { renderWithProviderAndRestful } from '@utils/test-renderers';
import { Guest } from 'Api';
import GuestFormEssential from 'components/guests/GuestFormEssential';
import nock from 'nock';
import React from 'react';

function buildGuestFormEssentialTargets(guest: Guest) {
    const formBuilder = new TestFormBuilder();
    formBuilder.append('age', guest.age?.toString() ?? '', '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    formBuilder.append('volunteer', guest.volunteer, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    return formBuilder.build();
}

describe('GuestFormEssential', () => {
    const mockedGuest = generateFakeGuest();
    const base = 'http://localhost';
    const { invalidInputs } = buildGuestFormEssentialTargets(mockedGuest);

    async function assertSubmitForm(result: Guest | string, responseCode = 200) {
        nock(base)
            .put(
                `/api/guest/${mockedGuest._id}`,
                JSON.stringify({
                    guestData: {
                        ...mockedGuest,
                        age: mockedGuest.age?.toString(), //useForm converts numbers to strings
                    },
                })
            )
            .delay(100) //to test button being disabled on request
            .reply(responseCode, result);
        const target = renderWithProviderAndRestful(
            <GuestFormEssential guest={mockedGuest} />,
            base
        );
        const saveButton = target.getByText(/save/i);
        fireEvent.click(saveButton);
        await waitFor(() => expect(saveButton).toBeDisabled());
        await waitFor(() => expect(saveButton).toBeEnabled());
        return {
            ...target,
        };
    }

    afterEach(() => {
        nock.cleanAll();
    });

    async function assertInputValidation(
        actualGuest: Guest,
        label?: string,
        invalidValue?: string
    ) {
        const component = renderWithProviderAndRestful(
            <GuestFormEssential guest={actualGuest} />,
            base
        );
        const { getByText, getByRole, getByLabelText } = component;
        const form = getByRole('form') as HTMLFormElement;
        if (label) {
            const match = new RegExp(label, 'i');
            fireEvent.change(getByLabelText(match), { target: { value: invalidValue } });
        }
        fireEvent.click(getByText(/save/i));
        await waitFor(() => expect(form.checkValidity()).toBeFalsy());
    }

    invalidInputs.forEach((invalidInput) => {
        it(invalidInput.description, async () => {
            await assertInputValidation(
                mockedGuest,
                invalidInput.label,
                invalidInput.invalidValue
            );
        });
    });

    // these are radio buttons
    it.each(['age', 'worshipTime'])('should be a required field [%s]', async (field) => {
        const actualGuest = {
            ...mockedGuest,
            [field]: '',
        };
        await assertInputValidation(actualGuest);
    });

    it('should render', () => {
        renderWithProviderAndRestful(<GuestFormEssential guest={mockedGuest} />, base);
    });

    it('should submit form with a valid data', async () => {
        await assertSubmitForm(mockedGuest, 200);
    });

    it('should display error message when submission fails', async () => {
        const { getByRole } = await assertSubmitForm('err', 500);
        await waitFor(() => expect(getByRole('error').textContent).toBe('err'));
    });
});
