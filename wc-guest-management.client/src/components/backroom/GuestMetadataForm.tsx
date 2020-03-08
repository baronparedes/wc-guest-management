import React from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../../@assets/img/wc-logo-transparent.png';
import { Models } from '../../@types/models';
import FieldContainer from '../@ui/FieldContainer';

const DarkCol = styled(Col)`
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

const BorderedLeftCol = styled(Col)`
    border-left: 10px solid #000000;
`;

const IndentedContainer = styled('div')`
    margin-left: 150px;
`;

type Props = {
    metadata: Models.GuestMetadata;
};

const GuestMetadataForm = (props: Props) => {
    return (
        <Container as={Form} handleSubmit={() => {}}>
            <BoxStack className="text-center rounded-md">
                <label className="m-auto display-2 text-bold">
                    {props.metadata.tableNumber}
                </label>
            </BoxStack>
            <Row>
                <DarkCol className="text-right">
                    <Image src={logo} height="80px" />
                </DarkCol>
            </Row>
            <Row>
                <Col md={5} sm={12}>
                    <IndentedContainer>
                        <FieldContainer label="worship service attended">
                            <br />
                            <Form.Check
                                inline
                                type="radio"
                                label="Saturday"
                                name="formWorshipDay"
                                id="formWorshipDay1"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Sunday"
                                name="formWorshipDay"
                                id="formWorshipDay2"
                            />
                        </FieldContainer>
                    </IndentedContainer>
                </Col>
                <Col md={4} sm={6}>
                    <FieldContainer label={<span>&nbsp;</span>}>
                        <br />
                        <Form.Check
                            inline
                            type="radio"
                            label="AM"
                            name="formWorshipTime"
                            id="formWorshipTime1"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="NN"
                            name="formWorshipTime"
                            id="formWorshipTime2"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="PM"
                            name="formWorshipTime"
                            id="formWorshipTime3"
                        />
                    </FieldContainer>
                </Col>
                <BorderedLeftCol md={3} sm={6} className="text-left">
                    <FieldContainer label="visit date">
                        <h4 className="text-bold">
                            {props.metadata.visitDate}
                        </h4>
                    </FieldContainer>
                </BorderedLeftCol>
            </Row>
            <Row>
                <DarkCol className="p-2 mb-3"></DarkCol>
            </Row>
            <Row>
                <Col md={6}>
                    <FieldContainer label="guest">
                        <Form.Control
                            required
                            // ref={register}
                            name="guest"
                            id="formGuest"
                            placeholder="guest"
                            value={props.metadata.guest}
                        />
                    </FieldContainer>
                </Col>
                <Col md={3}>
                    <FieldContainer label="birthdate">
                        <Form.Control
                            // ref={register}
                            name="birthdate"
                            id="formBirthdate"
                            placeholder="birthdate"
                        />
                    </FieldContainer>
                </Col>
                <Col md={3}>
                    <FieldContainer label="age">
                        <Form.Control
                            // ref={register}
                            name="age"
                            id="formAge"
                            type="number"
                            placeholder="age"
                        />
                    </FieldContainer>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FieldContainer label="mobile">
                        <Form.Control
                            // ref={register}
                            name="mobile"
                            id="formMobile"
                            placeholder="mobile"
                        />
                    </FieldContainer>
                </Col>
                <Col md={6}>
                    <FieldContainer label="email">
                        <Form.Control
                            // ref={register}
                            name="email"
                            id="formEmail"
                            placeholder="email"
                        />
                    </FieldContainer>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FieldContainer label="civil status">
                        <br />
                        <Form.Check
                            inline
                            type="radio"
                            label="Single"
                            name="formCivilStatus"
                            id="formCivilStatus1"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Married"
                            name="formCivilStatus"
                            id="formCivilStatus2"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Single Parent"
                            name="formCivilStatus"
                            id="formCivilStatus3"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Annulled / Divorced"
                            name="formCivilStatus"
                            id="formCivilStatus4"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Widower"
                            name="formCivilStatus"
                            id="formCivilStatus5"
                        />
                    </FieldContainer>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FieldContainer label="city of residence">
                        <Form.Control
                            // ref={register}
                            name="residence"
                            id="formResidence"
                            placeholder="residence"
                        />
                    </FieldContainer>
                </Col>
                <Col md={6}>
                    <FieldContainer label="city of work">
                        <Form.Control
                            // ref={register}
                            name="work"
                            id="formWork"
                            placeholder="work"
                        />
                    </FieldContainer>
                </Col>
            </Row>
            <Row>
                <DarkCol className="p-2 mb-3"></DarkCol>
            </Row>

            <Row>
                <Col>
                    <FieldContainer label="welcome notes...">
                        <br />
                        <Form.Check
                            inline
                            type="radio"
                            label="A"
                            name="formWelcomeAction"
                            id="formWelcomeAction1"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="DNA"
                            name="formWelcomeAction"
                            id="formWelcomeAction2"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Prayed"
                            name="formWelcomeAction"
                            id="formWelcomeAction3"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Counseled"
                            name="formWelcomeAction"
                            id="formWelcomeAction4"
                        />
                    </FieldContainer>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FieldContainer label="volunteer">
                        <Form.Control
                            // ref={register}
                            name="volunteer"
                            id="formVolunteer"
                            placeholder="volunteer"
                            value={props.metadata.volunteer}
                        />
                    </FieldContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default GuestMetadataForm;
