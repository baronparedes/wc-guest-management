import React, { useEffect, useState } from 'react';
import { getCurrentDateFormatted } from '../../@utils/dates';
import { FetchGuestsQueryParams, useFetchGuests } from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import GuestFilter from './GuestFilter';
import GuestTable from './GuestTable';

const GuestGuestsContainer = () => {
    const [query, setQuery] = useState<FetchGuestsQueryParams>({
        fromDate: getCurrentDateFormatted()
    });
    const { loading, error, data, refetch } = useFetchGuests({
        queryParams: query,
        lazy: true
    });
    const handleOnRefresh = (criteria?: string, visitDate?: string) => {
        setQuery({
            criteria: criteria,
            fromDate: visitDate
        });
    };
    useEffect(() => {
        refetch();
        // const interval = setInterval(() => {
        //     refetch();
        // }, 30000);
        // return () => {
        //     interval && clearInterval(interval);
        // };
        // eslint-disable-next-line
    }, [query]);
    return (
        <>
            <GuestFilter
                onRefresh={handleOnRefresh}
                criteria={query.criteria}
                fromDate={query.fromDate}
                disabled={loading}
            />
            {loading && <Loading />}
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {!loading && data && (
                <RoundedPanel>
                    <GuestTable guests={data} />
                </RoundedPanel>
            )}
        </>
    );
};

export default GuestGuestsContainer;
