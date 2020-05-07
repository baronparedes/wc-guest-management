import { Slot } from '@models';
import {
    fireEvent,
    render,
    waitFor,
    waitForElementToBeRemoved,
    within,
} from '@testing-library/react';
import { getCurrentDateFormatted } from '@utils/dates';
import {
    generateFakeDashboardReport,
    generateFakeGuest,
    generateFakeGuests,
} from '@utils/fake-models';
import { renderWithRestful } from '@utils/test-renderers';
import { DashboardReport, Guest } from 'Api';
import DashboardReportCategoryChart from 'components/dashboard/DashboardReportCategoryChart';
import DashboardReportContainer from 'components/dashboard/DashboardReportContainer';
import GuestFormQuick from 'components/guests/GuestFormQuick';
import faker from 'faker';
import * as useGuestSavedEffect from 'hooks/useGuestSavedEffect';
import nock from 'nock';
import React from 'react';

type DashboardReportCategoryChartProps = React.ComponentProps<
    typeof DashboardReportCategoryChart
>;

type GuestFormQuickProps = React.ComponentProps<typeof GuestFormQuick>;

jest.mock('components/guests/GuestFormQuick', () => (props: GuestFormQuickProps) => {
    return <div data-testid="guest-quick-form">{JSON.stringify(props.guest)}</div>;
});

jest.mock(
    'components/dashboard/DashboardReportCategoryChart',
    () => (props: DashboardReportCategoryChartProps) => {
        return (
            <div>
                <h1>guests by {props.category}</h1>
                <div data-testid={`dashboard-chart-${props.category}`}>
                    {JSON.stringify(props.data)}
                </div>
                <div>
                    {props.data.map((d) => {
                        return d.metrics.map((metric) => {
                            const id = `${props.category}-${d.label}-${metric.slot}`;
                            return (
                                <button
                                    data-testid={id}
                                    key={id}
                                    onClick={() => {
                                        props.onSelectMetric &&
                                            props.onSelectMetric(
                                                props.category,
                                                d.label,
                                                metric.slot
                                            );
                                    }}></button>
                            );
                        });
                    })}
                </div>
            </div>
        );
    }
);

describe('DashboardReportContainer', () => {
    const mockedDashboardData = generateFakeDashboardReport();
    const mockedGuests = generateFakeGuests();
    const mockedUseGuestSavedEffect = jest.fn();
    const base = 'http://localhost';

    async function assertFetchByDashboardCriteria(
        dashboardData: DashboardReport,
        response: Guest[] | string,
        responseCode = 200
    ) {
        const now = getCurrentDateFormatted();
        const target = renderWithRestful(
            <DashboardReportContainer
                reportData={dashboardData}
                query={{ fromDate: now }}
            />,
            base
        );

        const assert = async (title: string, index: string, slot: Slot) => {
            nock(base)
                .get(`/api/guest/category/${title}`)
                .query({
                    index,
                    slot,
                    fromDate: now,
                })
                .reply(responseCode, response);

            const id = `${title}-${index}-${slot}`;
            fireEvent.click(target.getByTestId(id));
            await waitFor(() => expect(target.getByRole('dialog')).toBeInTheDocument());
            await waitFor(() =>
                expect(target.getByRole('progressbar')).toBeInTheDocument()
            );
            await waitForElementToBeRemoved(() => target.queryByRole('progressbar'));
            responseCode === 500 &&
                (await waitFor(() =>
                    expect(target.getByRole('error')).toBeInTheDocument()
                ));

            fireEvent.click(target.getByText(/close/i));
            await waitForElementToBeRemoved(() => target.queryByRole('dialog'));
        };

        return {
            ...target,
            assert,
        };
    }

    async function assertFetchBySearchCriteria(
        response: Guest[] | string,
        responseCode = 200
    ) {
        const criteria = faker.random.words();
        const now = getCurrentDateFormatted();
        nock(base)
            .get('/api/guest')
            .query({
                criteria,
                fromDate: now,
            })
            .reply(responseCode, response);

        const target = renderWithRestful(
            <DashboardReportContainer
                reportData={mockedDashboardData}
                query={{ fromDate: now }}
            />,
            base
        );

        fireEvent.change(target.getByPlaceholderText(/search/i), {
            target: { value: criteria },
        });
        fireEvent.click(target.getByText(/search/i, { selector: 'button' }));

        await waitFor(() => expect(target.queryByRole('dialog')).toBeInTheDocument());
        await waitFor(() => expect(target.getByRole('progressbar')).toBeInTheDocument());
        await waitFor(() =>
            expect(target.queryByRole('progressbar')).not.toBeInTheDocument()
        );

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
        render(<DashboardReportContainer reportData={mockedDashboardData} />);
    });

    it('should render totals, summary, and charts', () => {
        const { getByText, getByTestId } = render(
            <DashboardReportContainer reportData={mockedDashboardData} />
        );

        expect(getByText(/^total guests$/i)).toBeInTheDocument();
        expect(getByText(/^9 am$/i)).toBeInTheDocument();
        expect(getByText(/^12 nn$/i)).toBeInTheDocument();
        expect(getByText(/^3 pm$/i)).toBeInTheDocument();
        expect(getByText(/^6 pm$/i)).toBeInTheDocument();

        mockedDashboardData.categories.forEach((category) => {
            expect(getByText(`guests by ${category.title}`)).toBeInTheDocument();
            expect(getByTestId(`dashboard-chart-${category.title}`).textContent).toBe(
                JSON.stringify(category.metrics)
            );
        });
    });

    it('should be able to close modal', async () => {
        const { getByText, queryByRole } = await assertFetchBySearchCriteria([]);
        fireEvent.click(getByText(/close/i));
        await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('should display guests on search criteria query', async () => {
        const { getByText } = await assertFetchBySearchCriteria(mockedGuests);

        mockedGuests.forEach((g) => {
            if (g.series) {
                const row = within(
                    getByText(g.series.toString()).closest('tr') as HTMLElement
                );
                expect(row.getByText(g.guest)).toBeInTheDocument();
                expect(row.getByText(g.volunteer)).toBeInTheDocument();
                expect(row.getByText(g.tableNumber.toString())).toBeInTheDocument();
            }
        });
    });

    it('should display guest form on search criteria query when a single guest is returned', async () => {
        const guest = generateFakeGuest();
        const { getByTestId } = await assertFetchBySearchCriteria([guest]);
        await waitFor(() => {
            expect(getByTestId('guest-quick-form').textContent).toBe(JSON.stringify(guest));
        });
    });

    it('should display error on search criteria query', async () => {
        const { getByRole } = await assertFetchBySearchCriteria('err', 500);
        expect(within(getByRole('dialog')).getByRole('error').textContent).toBe('err');
    });

    it('should display guests on dashboard criteria query', async () => {
        const { assert } = await assertFetchByDashboardCriteria(
            mockedDashboardData,
            mockedGuests,
            200
        );

        // for some reason dashboardData.categories.forEach does not wait for the nested loop to finish
        // causing overlapping acts()
        for (let i; (i = 0); mockedDashboardData.categories.length) {
            const cat = mockedDashboardData.categories[i];
            cat.metrics.forEach(async (metric) => {
                metric.metrics.forEach(async (summary) => {
                    await assert(cat.title, metric.label, summary.slot);
                });
            });
        }
    });

    it('should display error on dashboard criteria query', async () => {
        const { assert } = await assertFetchByDashboardCriteria(
            mockedDashboardData,
            'err',
            500
        );

        const cat = mockedDashboardData.categories[0];
        const title = cat.title;
        const index = cat.metrics[0].label;
        const slot = cat.metrics[0].metrics[0].slot;
        await assert(title, index, slot);
    });
});
