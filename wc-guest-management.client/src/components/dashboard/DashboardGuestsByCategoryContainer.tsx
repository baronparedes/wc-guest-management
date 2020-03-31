import React, { useEffect, useState } from 'react';
import { ReportCategory, Slot } from '../../@types/models';
import {
    GetDashboardReportQueryParams,
    useFetchGuestsByCategory
} from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import GuestTableModal from '../guests/GuestTableModal';

type Props = {
    slot: Slot;
    category: ReportCategory;
    index?: string;
    query?: GetDashboardReportQueryParams;
};

const DashboardGuestsByCategoryContainer = (props: Props) => {
    const [toggle, setToggle] = useState(false);
    const handleOnClose = () => setToggle(false);
    const { loading, error, data, refetch } = useFetchGuestsByCategory({
        category: props.category,
        slot: props.slot,
        queryParams: {
            index: props.index,
            fromDate: props.query && props.query.fromDate,
            toDate: props.query && props.query.toDate
        },
        lazy: true
    });

    useEffect(() => {
        refetch().then(() => {
            setToggle(true);
        });
        // eslint-disable-next-line
    }, [props.query, props.slot, props.category, props.index]);

    return (
        <>
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            {loading && <Loading />}
            {data && (
                <GuestTableModal
                    guests={data}
                    toggle={toggle}
                    onClose={handleOnClose}
                />
            )}
        </>
    );
};

export default DashboardGuestsByCategoryContainer;
