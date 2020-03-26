import React, { useState } from 'react';
import { getCurrentDateFormatted } from '../../@utils/dates';
import { useFetchGuests } from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import BackroomFilter from './BackroomFilter';
import BackroomGuestTable from './BackroomGuestTable';

const BackroomGuestsContainer = () => {
    console.log('render');
    const [criteria, setCriteria] = useState<string>();
    const [visitDate, setVisitDate] = useState<string | undefined>(
        getCurrentDateFormatted()
    );
    const { loading, error, data, refetch } = useFetchGuests({
        queryParams: {
            byCriteria: criteria,
            byVisitDate: visitDate
        }
    });

    const handleOnRefresh = (criteria?: string, visitDate?: string) => {
        setCriteria(criteria);
        setVisitDate(visitDate);
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <BackroomFilter
                onRefresh={handleOnRefresh}
                criteria={criteria}
                visitDate={visitDate}
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
