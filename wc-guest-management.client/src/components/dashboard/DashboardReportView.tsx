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
            {props.data.categories &&
                props.data.categories.map(cat => {
                    return (
                        <>
                            <DashboardReportCategoryChart
                                category={cat.title}
                                data={cat.metrics}
                            />
                            <br />
                        </>
                    );
                })}
        </>
    );
};

export default DashboardReportView;
