import { ReportCategory, Slot } from '@models';
import { ResponsiveBar } from '@nivo/bar';
import { ColorSchemeId } from '@nivo/colors';
import { DashboardLineItem } from 'Api';
import RoundedPanel from 'components/@ui/RoundedPanel';
import { useChartData } from 'hooks/useChartData';
import React from 'react';

type Props = {
    data: DashboardLineItem[];
    category: ReportCategory;
    scheme?: ColorSchemeId;
    onSelectMetric?: (category: ReportCategory, index: string, slot: Slot) => void;
};

const DashboardReportCategoryChart = (props: Props) => {
    const data = useChartData(props.data);
    return (
        <RoundedPanel>
            <div style={{ height: '400px' }} className="p-4">
                <h4 className="text-center">guests by {props.category}</h4>
                <ResponsiveBar
                    onClick={(e) => {
                        props.onSelectMetric &&
                            props.onSelectMetric(
                                props.category,
                                e.indexValue.toString(),
                                e.id.toString().toUpperCase() as Slot
                            );
                    }}
                    data={data.chartData}
                    keys={data.keys}
                    indexBy="index"
                    groupMode="grouped"
                    margin={{
                        top: 50,
                        right: 130,
                        bottom: 50,
                        left: 60,
                    }}
                    padding={0.3}
                    colors={{
                        scheme: props.scheme ? props.scheme : 'accent',
                    }}
                    innerPadding={4}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    axisLeft={null}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </RoundedPanel>
    );
};

export default DashboardReportCategoryChart;
