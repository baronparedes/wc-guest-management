import { fireEvent, render, waitFor } from '@testing-library/react';
import { formatDate, getCurrentDateFormatted } from '@utils/dates';
import DashboardFilter from 'components/dashboard/DashboardFilter';
import * as faker from 'faker';
import React from 'react';

describe('DashboardFilter', () => {
    async function assertRefresh(fromDate?: string, toDate?: string) {
        const onRefresh = jest.fn();
        const { getByText, getByLabelText } = render(
            <DashboardFilter onRefresh={onRefresh} />
        );

        fromDate = fromDate ?? getCurrentDateFormatted();

        const fromInput = getByLabelText(/from/i) as HTMLInputElement;
        fireEvent.change(fromInput, { target: { value: fromDate } });
        expect(fromInput.value).toBe(fromDate);

        const toInput = getByLabelText(/to/i) as HTMLInputElement;
        toDate && fireEvent.change(toInput, { target: { value: toDate } });
        toDate && expect(toInput.value).toBe(toDate);

        fireEvent.click(getByText(/refresh/i, { selector: 'button' }));
        await waitFor(() => {
            expect(onRefresh).toHaveBeenCalledTimes(1);
            expect(onRefresh).toHaveBeenCalledWith(fromDate, toDate ?? '');
        });
    }

    async function assertInputValidation(
        labelText: string,
        act: (input: HTMLInputElement) => void
    ) {
        const onRefresh = jest.fn();
        const { getByLabelText, getByText, getByRole } = render(
            <DashboardFilter onRefresh={onRefresh} />
        );

        const regex = new RegExp(labelText, 'i');
        const input = getByLabelText(regex) as HTMLInputElement;
        act(input);

        fireEvent.click(getByText(/refresh/i, { selector: 'button' }));
        expect((getByRole('form') as HTMLFormElement).checkValidity()).toBe(false);

        await waitFor(() => {
            expect(onRefresh).not.toHaveBeenCalled();
        });
    }

    async function assertDateValidation(
        labelText: string,
        dateValue: string,
        customAssert?: (actual: string) => void
    ) {
        await assertInputValidation(labelText, (input) => {
            fireEvent.change(input, { target: { value: dateValue } });
            !customAssert && expect(input.value).toBe(dateValue);
            customAssert && customAssert(input.value);
        });
    }

    it('should render', () => {
        render(<DashboardFilter />);
    });

    it('should submit form when refresh is clicked (default)', async () => {
        await assertRefresh();
    });

    it('should submit form when refresh is clicked (with from and to)', async () => {
        const from = new Date();
        from.setDate(from.getDate() - 10);
        const to = new Date();
        await assertRefresh(formatDate(from), formatDate(to));
    });

    it('should not submit form when fromDate exceeds date today', async () => {
        const from = new Date();
        from.setDate(from.getDate() + 20);
        const fromDate = formatDate(from);
        await assertDateValidation('from', fromDate);
    });

    it('should not submit form when fromDate is not filled up', async () => {
        await assertDateValidation('from', '');
    });

    it('should not submit form when fromDate is not a valid date', async () => {
        await assertDateValidation('from', faker.lorem.words(), (fromDate) =>
            expect(fromDate).toBe('')
        );
    });

    it('should not submit form when toDate exceeds date today', async () => {
        const to = new Date();
        to.setDate(to.getDate() + 20);
        const toDate = formatDate(to);
        await assertDateValidation('to', toDate);
    });
});
