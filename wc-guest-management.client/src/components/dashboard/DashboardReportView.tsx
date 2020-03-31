import React, { useState } from 'react';
import { ReportCategory, Slot } from '../../@types/models';
import {
    DashboardReport,
    GetDashboardReportQueryParams
} from '../../Api';
import DashboardGuestsByCategoryContainer from './DashboardGuestsByCategoryContainer';
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

const DashboardReportView: React.FC<Props> = props => {
    const [criteria, setCriteria] = useState<
        DashboardGuestsProps | undefined
    >(undefined);

    const handleOnSelectMetric = (
        category: ReportCategory,
        index: string,
        slot: Slot
    ) => {
        console.log(category);

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
                <DashboardGuestsByCategoryContainer
                    query={props.query}
                    {...criteria}
                />
            )}
        </>
    );
};

export default DashboardReportView;
