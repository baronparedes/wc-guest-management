import React, { useEffect, useState } from 'react';
import { ReportCategory, Slot } from '../../@types/models';
import {
    DashboardReport,
    GetDashboardReportQueryParams,
    useFetchGuests,
    useFetchGuestsByCategory
} from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import Loading from '../@ui/Loading';
import ModalContainer from '../@ui/ModalContainer';
import GuestTable from '../guests/GuestTable';
import DashboardReportCategoryChart from './DashboardReportCategoryChart';
import DashboardReportTotals from './DashboardReportTotals';

type Props = {
    reportData: DashboardReport;
    query?: GetDashboardReportQueryParams;
};

type DashboardGuestsProps = {
    category: ReportCategory;
    index: string;
    slot: Slot;
};

const DashboardReportContainer: React.FC<Props> = props => {
    const [action, setAction] = useState<'metric' | 'criteria' | undefined>(undefined);
    const [searchCriteria, setSearchCriteria] = useState<string | undefined>(undefined);
    const [criteria, setCriteria] = useState<DashboardGuestsProps | undefined>(undefined);
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
    const {
        loading: loadingGuests,
        error: errorGuests,
        data: dataGuests,
        refetch: refetchGuests
    } = useFetchGuests({
        queryParams: {
            criteria: searchCriteria,
            fromDate: props.query && props.query.fromDate,
            toDate: props.query && props.query.toDate
        },
        lazy: true
    });

    useEffect(() => {
        setToggle(true);
        if (criteria) {
            refetch();
        }
        // eslint-disable-next-line
    }, [criteria]);

    useEffect(() => {
        setToggle(true);
        if (searchCriteria) {
            refetchGuests();
        }
        // eslint-disable-next-line
    }, [searchCriteria]);

    const handleOnSelectMetric = (category: ReportCategory, index: string, slot: Slot) => {
        setCriteria({
            category: category,
            index: index,
            slot: slot
        });
        setAction('metric');
    };

    const handleOnSearch = (search?: string) => {
        if (search && search !== '') {
            setSearchCriteria(search);
            setAction('criteria');
        }
    };

    return (
        <>
            <DashboardReportTotals
                data={props.reportData}
                query={props.query}
                onSearch={handleOnSearch}
            />
            {props.reportData.categories &&
                props.reportData.categories.map(cat => {
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
            {action && (
                <ModalContainer
                    title="guests"
                    toggle={toggle}
                    onClose={handleOnClose}
                    modalsize="lg">
                    {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
                    {errorGuests && <ErrorInfo>{errorGuests.data as string}</ErrorInfo>}
                    {(loading || loadingGuests) && <Loading />}
                    {!loading && data && action === 'metric' && (
                        <GuestTable guests={data} />
                    )}
                    {!loadingGuests && dataGuests && action === 'criteria' && (
                        <GuestTable guests={dataGuests} />
                    )}
                </ModalContainer>
            )}
        </>
    );
};

export default DashboardReportContainer;
