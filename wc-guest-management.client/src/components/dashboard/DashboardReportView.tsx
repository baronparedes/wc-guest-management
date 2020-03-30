import React from 'react';
import { DashboardReport } from '../../Api';
import DashboardReportCategoryChart from './DashboardReportCategoryChart';
import DashboardReportTotals from './DashboardReportTotals';

type Props = {
    data: DashboardReport;
};

const DashboardReportView: React.FC<Props> = props => {
    return (
        <>
            <DashboardReportTotals data={props.data} />
            <DashboardReportCategoryChart
                category="guests by activity"
                data={props.data.activityCategory}
            />
            <br />
            <DashboardReportCategoryChart
                category="guests by age"
                data={props.data.ageCategory}
            />
        </>
    );
};

export default DashboardReportView;
