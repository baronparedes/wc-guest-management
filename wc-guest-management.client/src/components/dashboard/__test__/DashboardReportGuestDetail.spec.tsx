import { fireEvent, render } from '@testing-library/react';
import DashboardReportGuestDetail from 'components/dashboard/DashboardReportGuestDetail';
import * as faker from 'faker';
import React from 'react';

describe('DashboardReportGuestDetail', () => {
    it('should render', () => {
        render(<DashboardReportGuestDetail />);
    });

    it('should execute search when button is clicked', () => {
        const searchCriteria = faker.lorem.words();
        const onSearch = jest.fn();
        const { getByText, getByPlaceholderText } = render(
            <DashboardReportGuestDetail onSearch={onSearch} />
        );

        const input = getByPlaceholderText(/search/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: searchCriteria } });
        expect(input.value).toBe(searchCriteria);

        fireEvent.click(getByText(/search/i, { selector: 'button' }));
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it('should execute search on {enter} key press', () => {
        const searchCriteria = faker.lorem.words();
        const onSearch = jest.fn();
        const { getByPlaceholderText } = render(
            <DashboardReportGuestDetail onSearch={onSearch} />
        );

        const input = getByPlaceholderText(/search/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: searchCriteria } });
        fireEvent.keyUp(input, { keyCode: 13 });

        expect(input.value).toBe(searchCriteria);
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it('should not execute search when criteria is empty', () => {
        const onSearch = jest.fn();
        const { getByPlaceholderText } = render(
            <DashboardReportGuestDetail onSearch={onSearch} />
        );

        const input = getByPlaceholderText(/search/i) as HTMLInputElement;
        fireEvent.keyUp(input, { keyCode: 13 });
        expect(onSearch).not.toHaveBeenCalled();

        fireEvent.change(input, { target: { value: undefined } });
        fireEvent.keyUp(input, { keyCode: 13 });
        expect(onSearch).not.toHaveBeenCalled();

        fireEvent.change(input, { target: { value: '    ' } });
        fireEvent.keyUp(input, { keyCode: 13 });
        expect(onSearch).not.toHaveBeenCalled();
    });
});
