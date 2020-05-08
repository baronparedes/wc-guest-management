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
        <Container as={Form} onSubmit={handleSubmit(onSubmit)} disabled={loading}>
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
                <GuestFormAge register={register} md={3} />
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
                            'Widower',
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
                <GuestFormWelcomeNotes register={register} />
            </Row>
            <Row>
                <GuestFormVolunteer register={register} />
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
