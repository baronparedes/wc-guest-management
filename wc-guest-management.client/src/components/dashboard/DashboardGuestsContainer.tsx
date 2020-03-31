import React, { useEffect, useState } from 'react';
import {
    GetDashboardReportQueryParams,
    useGetDashboardReport
} from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import DashboardFilter from './DashboardFilter';
import DashboardReportContainer from './DashboardReportContainer';

const DashboardGuestsContainer = () => {
    const [query, setQuery] = useState<GetDashboardReportQueryParams>();
    const { loading, error, data, refetch } = useGetDashboardReport({
        queryParams: query,
        lazy: true
    });

    const handleOnRefresh = (fromDate: string, toDate?: string) => {
        setQuery({
            fromDate,
            toDate: toDate ? toDate : undefined
        });
    };

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, [query]);

    return (
        <>
            <DashboardFilter
                onRefresh={handleOnRefresh}
                disabled={loading}
            />
            {loading && <Loading />}
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {!loading && data && (
                <DashboardReportContainer
                    reportData={data}
                    query={query}
                />
            )}
        </>
    );
};

export default DashboardGuestsContainer;
