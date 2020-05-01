import { fireEvent, render, waitFor } from '@testing-library/react';
import { getCurrentDateFormatted } from '@utils/dates';
import { generateFakeDashboardReport } from '@utils/fake-models';
import { renderWithRestful } from '@utils/test-renderers';
import { DashboardReport } from 'Api';
import DashboardContainer from 'components/dashboard/DashboardContainer';
import DashboardReportContainer from 'components/dashboard/DashboardReportContainer';
import * as useGuestSavedEffect from 'hooks/useGuestSavedEffect';
import nock from 'nock';
import React from 'react';

type DashboardReportContainerProps = React.ComponentProps<typeof DashboardReportContainer>;

jest.mock(
    'components/dashboard/DashboardReportContainer',
    () => (props: DashboardReportContainerProps) => {
        return <div data-testid="dashboard-data">{JSON.stringify(props.reportData)}</div>;
    }
);

describe('DashboardContainer', () => {
    const mockedDashboardData: DashboardReport = generateFakeDashboardReport();
    const mockedDashboardDataRefreshed: DashboardReport = generateFakeDashboardReport();
    const mockedUseGuestSavedEffect = jest.fn();
    const base = 'http://localhost';

    async function assertInitialLoad() {
        nock(base).get('/api/dashboard').reply(200, mockedDashboardData);
        const target = renderWithRestful(<DashboardContainer />, base);
        expect(target.getByRole('progressbar')).toBeInTheDocument();
        await waitFor(() => {
            expect(target.queryByRole('progressbar')).not.toBeInTheDocument();
            expect(target.getByTestId('dashboard-data').textContent).toBe(
                JSON.stringify(mockedDashboardData)
            );
            expect(target.queryByRole('error')).not.toBeInTheDocument();
        });

        return {
            ...target,
        };
    }

    afterEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });

    beforeEach(() => {
        const mocked = jest.spyOn(useGuestSavedEffect, 'useGuestSavedEffect') as jest.Mock;
        mocked.mockImplementation(mockedUseGuestSavedEffect);
    });

    it('should render', () => {
        render(<DashboardContainer />);
    });

    it('should fetch Dashboard data on mount', async () => {
        await assertInitialLoad();
    });

    it('should refetch data when refresh button is clicked', async () => {
        const {
            getByText,
            getByRole,
            queryByRole,
            getByTestId,
        } = await assertInitialLoad();
        nock(base)
            .get('/api/dashboard')
            .query({
                fromDate: getCurrentDateFormatted(),
            })
            .reply(200, mockedDashboardDataRefreshed);

        fireEvent.click(getByText(/refresh/i));
        await waitFor(() => expect(getByRole('progressbar')).toBeInTheDocument());
        await waitFor(() => {
            expect(queryByRole('progressbar')).not.toBeInTheDocument();
            expect(getByTestId('dashboard-data').textContent).toBe(
                JSON.stringify(mockedDashboardDataRefreshed)
            );
            expect(queryByRole('error')).not.toBeInTheDocument();
        });
    });

    it('should display error on failure upon loading', async () => {
        nock(base).get('/api/dashboard').reply(500, 'err');
        const { getByRole, queryByRole, queryByTestId } = renderWithRestful(
            <DashboardContainer />,
            base
        );
        expect(getByRole('progressbar')).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByRole('progressbar')).not.toBeInTheDocument();
            expect(queryByTestId('dashboard-data')).not.toBeInTheDocument();
            expect(getByRole('error').textContent).toBe('err');
        });
    });

    it('should display error on failure upon refreshing', async () => {
        const {
            getByRole,
            queryByRole,
            getByText,
            getByTestId,
        } = await assertInitialLoad();
        nock(base)
            .get('/api/dashboard')
            .query({
                fromDate: getCurrentDateFormatted(),
            })
            .reply(500, 'err');

        fireEvent.click(getByText(/refresh/i));
        await waitFor(() => expect(getByRole('progressbar')).toBeInTheDocument());
        await waitFor(() => {
            expect(queryByRole('progressbar')).not.toBeInTheDocument();
            expect(getByTestId('dashboard-data').textContent).toBe(
                JSON.stringify(mockedDashboardData)
            );
            expect(getByRole('error').textContent).toBe('err');
        });
    });
});
