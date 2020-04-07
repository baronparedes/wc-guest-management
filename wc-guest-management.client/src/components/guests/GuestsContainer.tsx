import { Slot } from '@models';
import { getCurrentDateFormatted } from '@utils/dates';
import { FetchGuestsQueryParams, useFetchGuests } from 'Api';
import ErrorInfo from 'components/@ui/ErrorInfo';
import Loading from 'components/@ui/Loading';
import { useGuestSavedEffect } from 'hooks/useGuestSavedEffect';
import React, { useEffect, useState } from 'react';
import GuestFilter from './GuestFilter';
import GuestList from './GuestList';

const GuestContainer = () => {
    const [areaToggle, setAreaToggle] = useState(false);
    const handleOnAreaToggle = () => setAreaToggle(!areaToggle);
    const [query, setQuery] = useState<FetchGuestsQueryParams>({
        fromDate: getCurrentDateFormatted(),
    });
    const { loading, error, data, refetch } = useFetchGuests({
        queryParams: query,
        lazy: true,
    });
    const handleOnRefresh = (criteria?: string, visitDate?: string, slot?: Slot) => {
        setQuery({
            criteria: criteria,
            fromDate: visitDate,
            slot: slot,
        });
    };
    useGuestSavedEffect(() => {
        refetch();
    });
    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, [query]);
    return (
        <>
            <GuestFilter
                onRefresh={handleOnRefresh}
                criteria={query.criteria}
                fromDate={query.fromDate}
                slot={query.slot}
                disabled={loading}
            />
            {loading && <Loading />}
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {!loading && data && (
                <GuestList
                    guests={data}
                    areaToggle={areaToggle}
                    onAreaToggle={handleOnAreaToggle}
                />
            )}
        </>
    );
};

export default GuestContainer;
