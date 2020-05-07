import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { formatDate } from '@utils/dates';
import { getRandomTimeSlot } from '@utils/fake-models';
import { buildGuestFilterTargets, TargetInput } from '@utils/test-helpers';
import { renderWithRestful } from '@utils/test-renderers';
import GuestFilter from 'components/guests/GuestFilter';
import faker from 'faker';
import nock from 'nock';
import React from 'react';

describe('GuestFilter', () => {
    const base = 'http://localhost';
    const criteria = faker.random.words(2);
    const fromDate = formatDate(faker.date.recent());
    const slot = getRandomTimeSlot();
    const { targetInputs, invalidInputs } = buildGuestFilterTargets(
        criteria,
        fromDate,
        slot
    );

    function enterTargetInputs(target: RenderResult) {
        const iterateTargetInputs = (
            cb: (target: TargetInput, input: HTMLInputElement) => void
        ) => {
            targetInputs.forEach((targetInput) => {
                const input = target.container.querySelector(
                    `#${targetInput.label}`
                ) as HTMLInputElement;
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

    async function asserInvalidtInput(label: string, invalidValue: string) {
        const component = renderWithRestful(<GuestFilter />, base);
        const { getByText, getByRole, container } = component;
        const form = getByRole('form') as HTMLFormElement;
        enterTargetInputs(component);

        fireEvent.change(container.querySelector(`#${label}`) as HTMLInputElement, {
            target: { value: invalidValue },
        });
        fireEvent.click(getByText(/refresh/i));
        await waitFor(() => expect(form.checkValidity()).toBeFalsy());
    }

    afterEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });

    // TODO:look into it.each
    invalidInputs.forEach((invalidInput) => {
        it(invalidInput.description, async () => {
            await asserInvalidtInput(invalidInput.label, invalidInput.invalidValue);
        });
    });

    it('should render', () => {
        render(<GuestFilter />);
    });

    it('should render refresh button disabled', () => {
        const { getByText } = render(<GuestFilter disabled={true} />);
        expect(getByText(/refresh/i)).toBeDisabled();
    });

    it('should refresh filters on click', async () => {
        const handleRefresh = jest.fn();
        const component = render(<GuestFilter onRefresh={handleRefresh} />);
        const { getByRole, getByText } = component;
        const form = getByRole('form') as HTMLFormElement;
        enterTargetInputs(component);

        fireEvent.click(getByText(/refresh/i));
        await waitFor(() => expect(form.checkValidity()).toBeTruthy());
        expect(handleRefresh).toBeCalledTimes(1);
        expect(handleRefresh).toBeCalledWith(criteria, fromDate, slot);
    });

    it('should refresh filters on click and slot is undefined when "all slots" is selected', async () => {
        const handleRefresh = jest.fn();
        const component = render(<GuestFilter onRefresh={handleRefresh} />);
        const { getByRole, getByText, container } = component;
        const form = getByRole('form') as HTMLFormElement;
        enterTargetInputs(component);

        fireEvent.change(container.querySelector('#slot') as HTMLInputElement, {
            target: { value: 'all slots' },
        });
        fireEvent.click(getByText(/refresh/i));
        await waitFor(() => expect(form.checkValidity()).toBeTruthy());
        expect(handleRefresh).toBeCalledTimes(1);
        expect(handleRefresh).toBeCalledWith(criteria, fromDate, undefined);
    });
});
