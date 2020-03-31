import React, { useState } from 'react';
import { Button, Col, Form, FormControlProps, InputGroup, Row } from 'react-bootstrap';
import { DashboardReport, GetDashboardReportQueryParams } from '../../Api';
import FieldContainer from '../@ui/FieldContainer';
import RoundedPanel from '../@ui/RoundedPanel';
import DashboardReportTotal from './DashboardReportTotal';

type Props = {
    data: DashboardReport;
    onSearch?: (searchCriteria?: string) => void;
    query?: GetDashboardReportQueryParams;
};

const DashboardReportTotalsContainer = (props: Props) => {
    const [criteria, setCriteria] = useState<string | undefined>('');
    const handleOnChange = (e: React.FormEvent<FormControlProps>) => {
        setCriteria(e.currentTarget.value);
    };
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
                            <h5 className="p-0 m-0">add guest detail</h5>
                            <FieldContainer>
                                <InputGroup>
                                    <Form.Control
                                        name="dashboardSearch"
                                        size="lg"
                                        placeholder="search"
                                        value={criteria}
                                        onChange={handleOnChange}
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            onClick={() =>
                                                props.onSearch && props.onSearch(criteria)
                                            }
                                            variant="dark"
                                            type="button"
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

export default DashboardReportTotalsContainer;
