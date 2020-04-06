import { ReportCategory, Slot } from '@models';
import {
    GetDashboardReportQueryParams,
    useFetchGuests,
    useFetchGuestsByCategory,
} from 'Api';
import { useEffect } from 'react';

export type DashboardCriteria = {
    category: ReportCategory;
    index: string;
    slot: Slot;
};

export function useFetchDashboard(
    dashboardCriteria?: DashboardCriteria,
    searchCriteria?: string,
    query?: GetDashboardReportQueryParams
) {
    const dashboardGuests = useFetchGuestsByCategory({
        category: dashboardCriteria ? dashboardCriteria.category : 'age',
        queryParams: {
            slot: dashboardCriteria && dashboardCriteria.slot,
            index: dashboardCriteria && dashboardCriteria.index,
            fromDate: query && query.fromDate,
            toDate: query && query.toDate,
        },
        lazy: true,
    });
    const searchGuests = useFetchGuests({
        queryParams: {
            criteria: searchCriteria,
            fromDate: query && query.fromDate,
            toDate: query && query.toDate,
        },
        lazy: true,
    });

    useEffect(() => {
        if (dashboardCriteria) {
            dashboardGuests.refetch();
        }
        // eslint-disable-next-line
    }, [dashboardCriteria]);

    useEffect(() => {
        if (searchCriteria) {
            searchGuests.refetch();
        }
        // eslint-disable-next-line
    }, [searchCriteria]);

    return {
        dashboardGuests,
        searchGuests,
    };
}
