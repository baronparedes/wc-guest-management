import React from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../../@assets/img/wc-logo-transparent.png';
import { Models } from '../../@types/models';

const BlackCol = styled(Col)`
    background-color: #000000;
    color: #ffffff;
`;

const BoxStack = styled('div')`
    height: 110px;
    width: 110px;
    position: absolute;
    background-color: #ffc107;
    z-index: 1;
    margin: 1em;
    margin-left: 0.5em;
`;

const IndentedContainer = styled('div')`
    margin-left: 150px;
`;

type Props = {
    metadata: Models.GuestMetadata;
};

const GuestMetadataForm = (props: Props) => {
    return (
        <Container>
            <BoxStack className="text-center rounded-lg">
                <label className="m-auto display-2 text-bold">
                    {props.metadata.tableNumber}
                </label>
            </BoxStack>
            <Row>
                <BlackCol className="text-right">
                    <Image src={logo} height="80px" />
                </BlackCol>
            </Row>
            <Row>
                <Col>
                    <IndentedContainer>
                        <Form.Label>service</Form.Label>
                    </IndentedContainer>
                </Col>
                <Col className="text-right ">
                    <Form.Label>visit date</Form.Label>
                    <h5 className="text-bold">
                        {props.metadata.visitDate}
                    </h5>
                </Col>
            </Row>
            <Row>
                <BlackCol className="p-2"></BlackCol>
            </Row>
        </Container>
    );
};

export default GuestMetadataForm;
