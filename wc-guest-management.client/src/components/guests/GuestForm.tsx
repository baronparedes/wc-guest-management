import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import logo from '../../@assets/img/wc-logo-transparent.png';
import { formatDate } from '../../@utils/dates';
import { Guest, useUpdateGuestData } from '../../Api';
import BoxStacked from '../@ui/BoxStacked';
import ErrorInfo from '../@ui/ErrorInfo';
import FieldChecklist from '../@ui/FieldChecklist';
import FieldContainer from '../@ui/FieldContainer';

const DarkCol = styled(Col)`
    background-color: #000000;
    color: #ffffff;
`;

const IndentedCol = styled(Col)`
    padding-left: 150px;
`;

const BorderedLeftCol = styled(Col)`
    border-left: 10px solid #000000;
`;

type Props = {
    guest: Guest;
    onFormSaved: (saveData: Guest) => void;
};

const GuestForm = (props: Props) => {
    const { handleSubmit, register } = useForm<Guest>({
        defaultValues: {
            ...props.guest
        }
    });
    const { loading, error, mutate } = useUpdateGuestData({
        id: props.guest._id as string
    });
    const onSubmit = (formData: Guest) => {
        let data = Object.assign({}, formData);
        if (!data.age) data.age = undefined;
        if (!data.action) data.action = undefined;
        mutate({
            guestData: {
                ...data
            }
        }).then(savedData => {
            props.onFormSaved && props.onFormSaved(savedData);
        });
    };
    return (
        <Container as={Form} onSubmit={handleSubmit(onSubmit)} disabled={loading}>
            <BoxStacked className="text-center rounded-md">
                <label className="m-auto display-2 text-bold">
                    {props.guest.tableNumber}
                </label>
            </BoxStacked>
            <Row>
                <DarkCol className="text-right">
                    <Image src={logo} height="80px" />
                </DarkCol>
            </Row>
            <Row>
                <FieldContainer
                    as={IndentedCol}
                    md={5}
                    sm={12}
                    className="m-0"
                    label="worship service">
                    <br />
                    <FieldChecklist
                        required
                        checklist={['Saturday', 'Sunday']}
                        inline
                        type="radio"
                        name="worshipDay"
                        register={register}
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={4} sm={6} label="time" className="m-0">
                    <br />
                    <FieldChecklist
                        required
                        checklist={['9 AM', '12 NN', '3 PM', '6 PM']}
                        inline
                        type="radio"
                        name="worshipTime"
                        register={register}
                    />
                </FieldContainer>
                <FieldContainer
                    as={BorderedLeftCol}
                    md={3}
                    sm={6}
                    label="visit date"
                    className="text-left m-0">
                    <div>
                        <h4 className="font-weight-bold float-left">
                            {formatDate(new Date(props.guest.visitDate))}
                        </h4>
                        <span className="text-muted float-right">{props.guest.series}</span>
                    </div>

                    <input hidden name="visitDate" ref={register} />
                    <input hidden name="tableNumber" ref={register} />
                    <input hidden name="_id" ref={register} />
                    <input hidden name="series" ref={register} />
                </FieldContainer>
            </Row>
            <Row>
                <DarkCol className="p-2 mb-3" />
            </Row>
            <Row>
                <FieldContainer as={Col} md={6} label="guest">
                    <Form.Control
                        required
                        ref={register}
                        name="guest"
                        id="formGuest"
                        placeholder="guest"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="birthdate">
                    <Form.Control
                        ref={register}
                        name="birthDate"
                        id="formBirthDate"
                        placeholder="birthdate"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="age">
                    <Form.Control
                        ref={register}
                        name="age"
                        id="formAge"
                        type="number"
                        placeholder="age"
                        size="lg"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} md={6} label="mobile">
                    <Form.Control
                        ref={register}
                        name="mobile"
                        id="formMobile"
                        placeholder="mobile"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={6} label="email">
                    <Form.Control
                        ref={register}
                        name="email"
                        id="formEmail"
                        type="email"
                        placeholder="email"
                        size="lg"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} md={9} label="civil status">
                    <br />
                    <FieldChecklist
                        checklist={[
                            'Single',
                            'Married',
                            'Single Parent',
                            'Annulled / Divorced',
                            'Widower'
                        ]}
                        register={register}
                        inline
                        type="radio"
                        name="civilStatus"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="gender">
                    <br />
                    <FieldChecklist
                        checklist={['Male', 'Female']}
                        register={register}
                        inline
                        type="radio"
                        name="gender"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} md={6} label="city of residence">
                    <Form.Control
                        ref={register}
                        name="cityOfResidence"
                        id="formCityOfResidence"
                        placeholder="city of residence"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={6} label="city of work">
                    <Form.Control
                        ref={register}
                        name="cityOfWorkplace"
                        id="formCityOfWorkplace"
                        placeholder="city of work"
                        size="lg"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <DarkCol className="p-2 mb-3"></DarkCol>
            </Row>
            <Row>
                <FieldContainer as={Col} label="welcome notes...">
                    <br />
                    <FieldChecklist
                        checklist={['A', 'DNA', 'Prayed', 'Counseled']}
                        inline
                        type="radio"
                        name="action"
                        register={register}
                    />
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} label="volunteer">
                    <Form.Control
                        ref={register}
                        name="volunteer"
                        id="formVolunteer"
                        placeholder="volunteer"
                        size="lg"
                    />
                </FieldContainer>
            </Row>
            {error && (
                <Row>
                    <ErrorInfo>{error.data as string}</ErrorInfo>
                </Row>
            )}
            <Row>
                <FieldContainer as={Col} className="text-right">
                    <Button variant="primary" type="submit" size="lg" disabled={loading}>
                        Save
                    </Button>
                </FieldContainer>
            </Row>
        </Container>
    );
};

export default GuestForm;
