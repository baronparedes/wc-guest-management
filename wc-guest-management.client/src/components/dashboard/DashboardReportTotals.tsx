import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { DashboardReport } from '../../Api';
import FieldContainer from '../@ui/FieldContainer';
import RoundedPanel from '../@ui/RoundedPanel';
import DashboardReportTotal from './DashboardReportTotal';

type Props = {
    data: DashboardReport;
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
                    <RoundedPanel>
                        <div className="p-2">
                            <h5 className="p-0 m-0">
                                add guest detail
                            </h5>
                            <FieldContainer>
                                <InputGroup>
                                    <Form.Control
                                        name="dashboardSearch"
                                        size="lg"
                                        placeholder="search"
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant="dark"
                                            type="submit"
                                            size="lg">
                                            search
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </FieldContainer>
                        </div>
                    </RoundedPanel>
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
