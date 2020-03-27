import React, { useEffect, useState } from 'react';
import { getCurrentDateFormatted } from '../../@utils/dates';
import { FetchGuestsQueryParams, useFetchGuests } from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import GuestFilter from './GuestFilter';
import GuestGuestTable from './GuestTable';

const GuestGuestsContainer = () => {
    const [query, setQuery] = useState<FetchGuestsQueryParams>({
        byVisitDate: getCurrentDateFormatted()
    });
    const { loading, error, data, refetch } = useFetchGuests({
        queryParams: query
    });
    const handleOnRefresh = (criteria?: string, visitDate?: string) => {
        setQuery({
            byCriteria: criteria,
            byVisitDate: visitDate
        });
    };
    useEffect(() => {
        const interval = setInterval(() => {
            refetch().then();
        }, 30000);
        return () => {
            interval && clearInterval(interval);
        };
    }, []);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <GuestFilter
                onRefresh={handleOnRefresh}
                criteria={query.byCriteria}
                visitDate={query.byVisitDate}
            />
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {data && (
                <RoundedPanel>
                    <GuestGuestTable guests={data} />
                </RoundedPanel>
            )}
        </>
    );
};

export default GuestGuestsContainer;
