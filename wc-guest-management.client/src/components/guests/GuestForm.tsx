import { Guest } from 'Api';
import ErrorInfo from 'components/@ui/ErrorInfo';
import FieldChecklist from 'components/@ui/FieldChecklist';
import FieldContainer from 'components/@ui/FieldContainer';
import { BorderedLeftCol, DarkCol, IndentedCol } from 'components/@ui/StyledCol';
import { GuestButtonModalProps } from 'hoc/withEditGuestButtonModal';
import { usePostGuestForm } from 'hooks/usePostGuestForm';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import {
    GuestFormAge,
    GuestFormHeader,
    GuestFormSaveButton,
    GuestFormTableNumber,
    GuestFormVisitDate,
    GuestFormVolunteer,
    GuestFormWelcomeNotes,
    GuestFormWorshipTime,
} from './GuestFormInputs';

const GuestForm = (props: GuestButtonModalProps) => {
    const { loading, error, handleSubmit, onSubmit, register } = usePostGuestForm<Guest>({
        defaultValues: {
            ...props.guest,
        },
        id: props.guest._id as string,
        onPreSubmit: (formData: Guest) => {
            let data = Object.assign({}, formData);
            if (!data.age) data.age = undefined;
            if (!data.action) data.action = undefined;
            return data;
        },
        onFormSaved: props.onFormSaved,
    });
    return (
        <Container
            as={Form}
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}
            role="form">
            <GuestFormTableNumber tableNumber={props.guest.tableNumber} />
            <Row>
                <GuestFormHeader />
            </Row>
            <Row>
                <FieldContainer
                    as={IndentedCol}
                    md={5}
                    sm={12}
                    className="m-0"
                    controlId="worshipDay"
                    label="worship service">
                    <br />
                    <FieldChecklist
                        required
                        checklist={['Saturday', 'Sunday']}
                        inline
                        type="radio"
                        name="worshipDay"
                        register={register({ required: true })}
                    />
                </FieldContainer>
                <GuestFormWorshipTime register={register} md={4} sm={6} />
                <GuestFormVisitDate
                    as={BorderedLeftCol}
                    md={3}
                    sm={6}
                    visitDate={props.guest.visitDate}
                    series={props.guest.series}>
                    <input hidden name="visitDate" ref={register} />
                    <input hidden name="tableNumber" ref={register} />
                    <input hidden name="_id" ref={register} />
                    <input hidden name="series" ref={register} />
                </GuestFormVisitDate>
            </Row>
            <Row>
                <DarkCol className="p-2 mb-3" />
            </Row>
            <Row>
                <FieldContainer as={Col} md={6} label="guest" controlId="guest">
                    <Form.Control
                        required
                        ref={register({ required: true })}
                        name="guest"
                        placeholder="guest"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="birthdate" controlId="birthDate">
                    <Form.Control
                        ref={register}
                        name="birthDate"
                        placeholder="birthdate"
                        size="lg"
                    />
                </FieldContainer>
                <GuestFormAge register={register} md={3} />
            </Row>
            <Row>
                <FieldContainer as={Col} md={6} label="mobile" controlId="mobile">
                    <Form.Control
                        ref={register}
                        name="mobile"
                        placeholder="mobile"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={6} label="email" controlId="email">
                    <Form.Control
                        ref={register}
                        name="email"
                        type="email"
                        placeholder="email"
                        size="lg"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer
                    as={Col}
                    md={9}
                    label="civil status"
                    controlId="civilStatus">
                    <br />
                    <FieldChecklist
                        checklist={[
                            'Single',
                            'Married',
                            'Single Parent',
                            'Annulled / Divorced',
                            'Widower',
                        ]}
                        register={register}
                        inline
                        type="radio"
                        name="civilStatus"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="gender" controlId="gender">
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
                <FieldContainer
                    as={Col}
                    md={6}
                    label="city of residence"
                    controlId="cityOfResidence">
                    <Form.Control
                        ref={register}
                        name="cityOfResidence"
                        placeholder="city of residence"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer
                    as={Col}
                    md={6}
                    label="city of work"
                    controlId="cityOfWorkplace">
                    <Form.Control
                        ref={register}
                        name="cityOfWorkplace"
                        placeholder="city of work"
                        size="lg"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <DarkCol className="p-2 mb-3"></DarkCol>
            </Row>
            <Row>
                <GuestFormWelcomeNotes register={register} />
            </Row>
            <Row>
                <GuestFormVolunteer register={register({ required: true })} />
            </Row>
            {error && (
                <Row>
                    <ErrorInfo>{error.data as string}</ErrorInfo>
                </Row>
            )}
            <Row>
                <GuestFormSaveButton loading={loading} />
            </Row>
        </Container>
    );
};

export default GuestForm;
