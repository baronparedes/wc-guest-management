import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DashboardReport, GetDashboardReportQueryParams } from '../../Api';
import DashboardReportGuestDetail from './DashboardReportGuestDetail';
import DashboardReportTotal from './DashboardReportTotal';

type Props = {
    data: DashboardReport;
    onSearch?: (searchCriteria?: string) => void;
    query?: GetDashboardReportQueryParams;
};

const DashboardReportTotals = (props: Props) => {
    return (
        <>
            <Row>
                <DashboardReportTotal
                    bg="primary"
                    title="total guests"
                    total={props.data.totalGuests}
                />
                <Col md={6} className="pb-4 d-print-none">
                    <DashboardReportGuestDetail onSearch={props.onSearch} />
                </Col>
            </Row>
            <Row>
                {props.data.summary &&
                    props.data.summary.map(item => {
                        return (
                            <DashboardReportTotal
                                key={item.slot}
                                bg="success"
                                title={item.slot}
                                total={item.count}
                            />
                        );
                    })}
            </Row>
        </>
    );
};

export default DashboardReportTotals;
