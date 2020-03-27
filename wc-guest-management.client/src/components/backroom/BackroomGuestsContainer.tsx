import React, { useEffect, useState } from 'react';
import { getCurrentDateFormatted } from '../../@utils/dates';
import { FetchGuestsQueryParams, useFetchGuests } from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import BackroomFilter from './BackroomFilter';
import BackroomGuestTable from './BackroomGuestTable';

const BackroomGuestsContainer = () => {
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
        console.log('starting polling');
        const interval = setInterval(() => {
            console.log('refreshing');
            refetch();
        }, 60000);
        return () => {
            interval && clearInterval(interval);
        };
    }, []);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <BackroomFilter
                onRefresh={handleOnRefresh}
                criteria={query.byCriteria}
                visitDate={query.byVisitDate}
            />
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {data && (
                <RoundedPanel>
                    <BackroomGuestTable guests={data} />
                </RoundedPanel>
            )}
        </>
    );
};

export default BackroomGuestsContainer;
