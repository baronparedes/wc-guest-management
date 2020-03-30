import React from 'react';
import { Card, Col } from 'react-bootstrap';

export type DashboardReportTotalProps = {
    bg:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light';
    headerTextColor?: string;
    title: string;
    total: number;
};

const DashboardReportTotal = (props: DashboardReportTotalProps) => {
    return (
        <Col className="pb-4">
            <Card
                style={{ border: 'none' }}
                className="text-center"
                bg={props.bg}
                text="dark">
                <Card.Header
                    style={{
                        color: props.headerTextColor
                            ? props.headerTextColor
                            : '#FFFFFF'
                    }}>
                    <h6>{props.title}</h6>
                </Card.Header>
                <Card.Body
                    style={{
                        backgroundColor: '#ffffff',
                        border: 'none'
                    }}>
                    <Card.Text>
                        <strong style={{ fontSize: '2em' }}>
                            {props.total}
                        </strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DashboardReportTotal;
