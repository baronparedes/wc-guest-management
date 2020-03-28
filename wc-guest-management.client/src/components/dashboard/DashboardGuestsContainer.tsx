import React, { useState } from 'react';
import {
    GetDashboardReportQueryParams,
    useGetDashboardReport
} from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import DashboardFilter from './DashboardFilter';

const DashboardGuestsContainer = () => {
    const [query, setQuery] = useState<GetDashboardReportQueryParams>();
    const { loading, error, data, refetch } = useGetDashboardReport({
        queryParams: query
    });

    const handleOnRefresh = (fromDate: string, toDate?: string) => {
        console.log(fromDate);
        console.log(toDate);
        setQuery({
            fromDate,
            toDate: toDate ? toDate : undefined
        });
        refetch();
    };

    return (
        <>
            <DashboardFilter
                onRefresh={handleOnRefresh}
                disabled={loading}
            />
            {loading && <Loading />}
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {!loading && data && <p>{JSON.stringify(data)}</p>}
        </>
    );
};

export default DashboardGuestsContainer;
