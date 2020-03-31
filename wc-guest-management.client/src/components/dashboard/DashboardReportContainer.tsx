import React, { useEffect, useState } from 'react';
import { ReportCategory, Slot } from '../../@types/models';
import {
    DashboardReport,
    GetDashboardReportQueryParams,
    useFetchGuestsByCategory
} from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import ModalContainer from '../@ui/ModalContainer';
import GuestTable from '../guests/GuestTable';
import DashboardReportCategoryChart from './DashboardReportCategoryChart';
import DashboardReportTotals from './DashboardReportTotals';

type Props = {
    data: DashboardReport;
    query?: GetDashboardReportQueryParams;
};

type DashboardGuestsProps = {
    category: ReportCategory;
    index: string;
    slot: Slot;
};

const DashboardReportContainer: React.FC<Props> = props => {
    const [criteria, setCriteria] = useState<
        DashboardGuestsProps | undefined
    >(undefined);

    const [toggle, setToggle] = useState(false);
    const handleOnClose = () => setToggle(false);
    const { loading, error, data, refetch } = useFetchGuestsByCategory({
        category: criteria ? criteria.category : 'age',
        slot: criteria ? criteria.slot : 'AM',
        queryParams: {
            index: criteria && criteria.index,
            fromDate: props.query && props.query.fromDate,
            toDate: props.query && props.query.toDate
        },
        lazy: true
    });

    useEffect(() => {
        setToggle(true);
        refetch();
        // eslint-disable-next-line
    }, [props.query, criteria]);

    const handleOnSelectMetric = (
        category: ReportCategory,
        index: string,
        slot: Slot
    ) => {
        setCriteria({
            category: category,
            index: index,
            slot: slot
        });
    };

    return (
        <>
            <DashboardReportTotals data={props.data} />
            {props.data.categories &&
                props.data.categories.map(cat => {
                    return (
                        <div key={cat.title} className="pb-4">
                            <DashboardReportCategoryChart
                                onSelectMetric={handleOnSelectMetric}
                                category={cat.title}
                                data={cat.metrics}
                            />
                        </div>
                    );
                })}
            {criteria && (
                <ModalContainer
                    title="guests"
                    toggle={toggle}
                    onClose={handleOnClose}
                    modalsize="lg">
                    {error && (
                        <ErrorInfo>{error.data as string}</ErrorInfo>
                    )}
                    {loading && <Loading />}
                    {!loading && data && <GuestTable guests={data} />}
                </ModalContainer>
            )}
        </>
    );
};

export default DashboardReportContainer;
