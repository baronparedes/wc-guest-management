import React from 'react';
import { DashboardReport } from '../../Api';
import DashboardReportTotals from './DashboardReportTotals';

type Props = {
    data: DashboardReport;
};

const DashboardReportView: React.FC<Props> = props => {
    return (
        <>
            <DashboardReportTotals data={props.data} />
        </>
    );
};

export default DashboardReportView;
