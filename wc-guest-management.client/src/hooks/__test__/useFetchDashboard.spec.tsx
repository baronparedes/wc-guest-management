import { cleanup, renderHook } from '@testing-library/react-hooks';
import { getCurrentDateFormatted } from '@utils/dates';
import { renderHookWithRestfulProvider } from '@utils/test-renderers';
import { GetDashboardReportQueryParams, Guest } from 'Api';
import { DashboardCriteria, useFetchDashboard } from 'hooks/useFetchDashboard';
import nock from 'nock';

describe('useFetchDashboard', () => {
    const base = 'http://localhost';
    const now = getCurrentDateFormatted();
    const query: GetDashboardReportQueryParams = {
        fromDate: now,
        toDate: now,
    };
    const searchCriteria = 'search-criteria';
    const dashboardCriteria: DashboardCriteria = {
        category: 'age',
        index: 'test-index',
        slot: '9 AM',
    };
    const guests: Guest[] = [
        {
            guest: 'test-guest',
            tableNumber: 1,
            visitDate: getCurrentDateFormatted(),
            volunteer: 'test-volunteer',
        },
    ];

    afterEach(() => {
        cleanup();
        nock.cleanAll();
    });

    it('should not crash', () => {
        renderHook(() => useFetchDashboard());
    });

    it('should fetch guests by searchCriteria', async () => {
        nock(base).get('/api/guest').query({ criteria: searchCriteria }).reply(200, guests);

        const { result, waitForNextUpdate } = renderHookWithRestfulProvider(
            () => useFetchDashboard(undefined, searchCriteria),
            base
        );

        expect(result.current.searchGuests.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.searchGuests.loading).toBe(false);
        expect(result.current.searchGuests.data).toStrictEqual(guests);
    });

    it('should fetch guests by searchCriteria and query', async () => {
        const { fromDate, toDate } = query;

        nock(base)
            .get('/api/guest')
            .query({ criteria: searchCriteria, fromDate, toDate })
            .reply(200, guests);

        const { result, waitForNextUpdate } = renderHookWithRestfulProvider(
            () => useFetchDashboard(undefined, searchCriteria, query),
            base
        );

        expect(result.current.searchGuests.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.searchGuests.loading).toBe(false);
        expect(result.current.searchGuests.data).toStrictEqual(guests);
    });

    it('should error when fetching guests by searchCriteria', async () => {
        nock(base).get('/api/guest').query({ criteria: searchCriteria }).reply(401, 'err');

        const { result, waitForNextUpdate } = renderHookWithRestfulProvider(
            () => useFetchDashboard(undefined, searchCriteria),
            base
        );

        expect(result.current.searchGuests.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.searchGuests.loading).toBe(false);
        expect(result.current.searchGuests.error?.data).toBe('err');
    });

    it('should fetch guests by dashboardCriteria', async () => {
        const { slot, index } = dashboardCriteria;
        nock(base).get('/api/guest/category/age').query({ slot, index }).reply(200, guests);

        const { result, waitForNextUpdate } = renderHookWithRestfulProvider(
            () => useFetchDashboard(dashboardCriteria),
            base
        );

        expect(result.current.dashboardGuests.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.dashboardGuests.loading).toBe(false);
        expect(result.current.dashboardGuests.data).toStrictEqual(guests);
    });

    it('should fetch guests by dashboardCriteria and query', async () => {
        const { slot, index } = dashboardCriteria;
        const { fromDate, toDate } = query;
        nock(base)
            .get('/api/guest/category/age')
            .query({ slot, index, fromDate, toDate })
            .reply(200, guests);

        const { result, waitForNextUpdate } = renderHookWithRestfulProvider(
            () => useFetchDashboard(dashboardCriteria, undefined, query),
            base
        );

        expect(result.current.dashboardGuests.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.dashboardGuests.loading).toBe(false);
        expect(result.current.dashboardGuests.data).toStrictEqual(guests);
    });

    it('should error when fetching guests by dashboardCriteria', async () => {
        const { slot, index } = dashboardCriteria;
        nock(base).get('/api/guest/category/age').query({ slot, index }).reply(401, 'err');

        const { result, waitForNextUpdate } = renderHookWithRestfulProvider(
            () => useFetchDashboard(dashboardCriteria),
            base
        );

        expect(result.current.dashboardGuests.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.dashboardGuests.loading).toBe(false);
        expect(result.current.dashboardGuests.error?.data).toBe('err');
    });
});
