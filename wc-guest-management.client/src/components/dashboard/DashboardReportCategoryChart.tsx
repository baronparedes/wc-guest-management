import { ResponsiveBar } from '@nivo/bar';
import { ColorSchemeId } from '@nivo/colors';
import React from 'react';
import { DashboardLineItem } from '../../Api';
import RoundedPanel from '../@ui/RoundedPanel';

type Props = {
    data: DashboardLineItem[];
    category: string;
    scheme?: ColorSchemeId;
};

function toChartData(data: DashboardLineItem[]) {
    const chartData = data.map(d => {
        const getCount = (
            item: DashboardLineItem,
            slot: string
        ): number => {
            const metric = item.metrics.find(m => m.slot === slot);
            return metric ? metric.count : 0;
        };

        return {
            index: d.label,
            am: getCount(d, 'AM'),
            pm: getCount(d, 'PM'),
            nn: getCount(d, 'NN'),
            none: getCount(d, 'N/A')
        };
    });
    return chartData;
}

const DashboardReportCategoryChart = (props: Props) => {
    const data = toChartData(props.data);
    return (
        <RoundedPanel>
            <div style={{ height: '400px' }} className="p-4">
                <h4 className="text-center">{props.category}</h4>
                <ResponsiveBar
                    data={data}
                    keys={['am', 'nn', 'pm', 'none']}
                    indexBy="index"
                    groupMode="grouped"
                    margin={{
                        top: 50,
                        right: 130,
                        bottom: 50,
                        left: 60
                    }}
                    padding={0.3}
                    colors={{
                        scheme: props.scheme ? props.scheme : 'accent'
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
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
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