import React, { useState } from 'react';
import { ReportCategory, Slot } from '../../@types/models';
import { DashboardReport, GetDashboardReportQueryParams } from '../../Api';
import { DashboardCriteria, useFetchDashboard } from '../@hooks/useFetchDashboard';
import { useGuestSavedEffect } from '../@hooks/useGuestSavedEffect';
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

const DashboardReportContainer: React.FC<Props> = props => {
    const [action, setAction] = useState<'metric' | 'criteria'>();
    const [searchCriteria, setSearchCriteria] = useState<string>();
    const [dashboardCriteria, setDashboardCriteria] = useState<DashboardCriteria>();
    const [toggle, setToggle] = useState(false);
    const { dashboardGuests, searchGuests } = useFetchDashboard(
        dashboardCriteria,
        searchCriteria,
        props.query
    );
    const handleOnClose = () => setToggle(false);
    const handleOnSelectMetric = (category: ReportCategory, index: string, slot: Slot) => {
        setDashboardCriteria({
            category: category,
            index: index,
            slot: slot
        });
        setAction('metric');
        setToggle(true);
    };
    const handleOnSearch = (search?: string) => {
        if (search && search !== '') {
            setSearchCriteria(search);
            setAction('criteria');
            setToggle(true);
        }
    };
    useGuestSavedEffect(() => {
        setToggle(false);
    });
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
                    {dashboardGuests.error && (
                        <ErrorInfo>{dashboardGuests.error.data as string}</ErrorInfo>
                    )}
                    {searchGuests.error && (
                        <ErrorInfo>{searchGuests.error.data as string}</ErrorInfo>
                    )}
                    {(dashboardGuests.loading || searchGuests.loading) && <Loading />}
                    {!dashboardGuests.loading &&
                        dashboardGuests.data &&
                        action === 'metric' && <GuestTable guests={dashboardGuests.data} />}
                    {!searchGuests.loading &&
                        searchGuests.data &&
                        action === 'criteria' && <GuestTable guests={searchGuests.data} />}
                </ModalContainer>
            )}
        </>
    );
};

export default DashboardReportContainer;
