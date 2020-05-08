import { fireEvent, waitFor } from '@testing-library/react';
import { generateFakeGuest } from '@utils/fake-models';
import { TestFormBuilder } from '@utils/test-helpers';
import { renderWithProviderAndRestful } from '@utils/test-renderers';
import { Guest } from 'Api';
import GuestForm from 'components/guests/GuestForm';
import nock from 'nock';
import React from 'react';

function buildGuestFormTargets(guest: Guest) {
    const formBuilder = new TestFormBuilder();
    formBuilder.append('volunteer', guest.volunteer, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    formBuilder.append('guest', guest.guest, '', [
        { invalidValue: '', validationType: 'required' },
    ]);
    return formBuilder.build();
}

describe('GuestForm', () => {
    const mockedGuest = generateFakeGuest();
    const base = 'http://localhost';
    const { invalidInputs } = buildGuestFormTargets(mockedGuest);

    async function assertSubmitForm(result: Guest | string, responseCode = 200) {
        nock(base)
            .put(
                `/api/guest/${mockedGuest._id}`,
                // data order being passed should be same with the form
                JSON.stringify({
                    guestData: {
                        worshipDay: mockedGuest.worshipDay,
                        worshipTime: mockedGuest.worshipTime,
                        visitDate: mockedGuest.visitDate,
                        tableNumber: mockedGuest.tableNumber.toString(),
                        _id: mockedGuest._id,
                        series: mockedGuest.series?.toString(),
                        guest: mockedGuest.guest,
                        birthDate: mockedGuest.birthDate ?? '',
                        age: mockedGuest.age?.toString(),
                        mobile: mockedGuest.mobile ?? '',
                        email: mockedGuest.email ?? '',
                        civilStatus: mockedGuest.civilStatus ?? '',
                        gender: mockedGuest.gender ?? '',
                        cityOfResidence: mockedGuest.cityOfResidence ?? '',
                        cityOfWorkplace: mockedGuest.cityOfWorkplace ?? '',
                        action: mockedGuest.action,
                        volunteer: mockedGuest.volunteer,
                    },
                })
            )
            .delay(100) //to test button being disabled on request
            .reply(responseCode, result);
        const target = renderWithProviderAndRestful(
            <GuestForm guest={mockedGuest} />,
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

    async function assertInputValidation(
        actualGuest: Guest,
        label?: string,
        invalidValue?: string
    ) {
        const component = renderWithProviderAndRestful(
            <GuestForm guest={actualGuest} />,
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

    afterEach(() => {
        nock.cleanAll();
    });

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
    it.each(['worshipDay'])('should be a required field [%s]', async (field) => {
        const actualGuest = {
            ...mockedGuest,
            [field]: '',
        };
        await assertInputValidation(actualGuest);
    });

    it('should render', () => {
        renderWithProviderAndRestful(<GuestForm guest={mockedGuest} />, base);
    });

    it('should submit form with a valid data', async () => {
        await assertSubmitForm(mockedGuest, 200);
    });

    it('should display error message when submission fails', async () => {
        const { getByRole } = await assertSubmitForm('err', 500);
        await waitFor(() => expect(getByRole('error').textContent).toBe('err'));
    });
});
