import Brand from 'components/@ui/Brand';
import React from 'react';
import { Col, Container } from 'react-bootstrap';
import GuestInfoSlipForm from './GuestInfoSlipForm';

const GuestInfoSlipView = () => {
    return (
        <Container>
            <Col className="d-md-none">
                <Brand fluid />
            </Col>
            <Col className="d-none d-md-block">
                <Brand height="300px" />
            </Col>
            <Col>
                <GuestInfoSlipForm />
            </Col>
        </Container>
    );
};

export default GuestInfoSlipView;
