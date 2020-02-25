import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../../@assets/img/wc-logo-transparent.png';

const GuestMetadataFormCol = styled(Col)`
    background-color: #000000;
    color: #ffffff;
`;

const BoxStack = styled('div')`
    height: 110px;
    width: 110px;
    position: absolute;
    background-color: orange;
    z-index: 1;
    margin: 1em;
    margin-left: 0.5em;
`;

const IndentedContainer = styled('div')`
    margin-left: 150px;
`;

const GuestMetadataForm = () => {
    return (
        <Container>
            <BoxStack className="text-center rounded-lg">
                <label className="m-auto display-2 text-bold">72</label>
            </BoxStack>
            <Row>
                <GuestMetadataFormCol className="text-right">
                    <Image src={logo} height="80px" />
                </GuestMetadataFormCol>
            </Row>
            <Row>
                <Col>
                    <IndentedContainer>Data</IndentedContainer>
                </Col>
                <Col>Data</Col>
            </Row>
            <Row>
                <GuestMetadataFormCol className="p-3"></GuestMetadataFormCol>
            </Row>
        </Container>
    );
};

export default GuestMetadataForm;
