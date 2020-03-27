import React from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    Image,
    Row
} from 'react-bootstrap';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import logo from '../../@assets/img/wc-logo-transparent.png';
import { formatDate } from '../../@utils/dates';
import {
    Guest,
    UpdateGuestDataRequestBody,
    useUpdateGuestData
} from '../../Api';
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
        const body: UpdateGuestDataRequestBody = {
            guestData: formData
        };
        mutate(body).then(() => {
            props.onFormSaved && props.onFormSaved(formData);
        });
    };
    return (
        <Container
            as={Form}
            onSubmit={handleSubmit(onSubmit)}
            disabled={loading}>
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
                <FieldContainer
                    as={Col}
                    md={4}
                    sm={6}
                    label="time"
                    className="m-0">
                    <br />
                    <FieldChecklist
                        required
                        checklist={['AM', 'NN', 'PM']}
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
                    <h4 className="text-bold">
                        {formatDate(new Date(props.guest.visitDate))}
                    </h4>
                    <input hidden name="visitDate" ref={register} />
                    <input hidden name="tableNumber" ref={register} />
                    <input hidden name="_id" ref={register} />
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
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="birthdate">
                    <Form.Control
                        ref={register}
                        name="birthDate"
                        id="formBirthDate"
                        placeholder="birthdate"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={3} label="age">
                    <Form.Control
                        ref={register}
                        name="age"
                        id="formAge"
                        type="number"
                        placeholder="age"
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
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={6} label="email">
                    <Form.Control
                        ref={register}
                        name="email"
                        id="formEmail"
                        type="email"
                        placeholder="email"
                    />
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} label="civil status">
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
            </Row>
            <Row>
                <FieldContainer
                    as={Col}
                    md={6}
                    label="city of residence">
                    <Form.Control
                        ref={register}
                        name="cityOfResidence"
                        id="formCityOfResidence"
                        placeholder="city of residence"
                    />
                </FieldContainer>
                <FieldContainer as={Col} md={6} label="city of work">
                    <Form.Control
                        ref={register}
                        name="cityOfWorkplace"
                        id="formCityOfWorkplace"
                        placeholder="city of work"
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
                        required
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
                    />
                </FieldContainer>
            </Row>
            {error && (
                <Row>
                    <ErrorInfo>{error.data as string}</ErrorInfo>
                </Row>
            )}
            <Row>
                <FieldContainer as={Col} md={12} className="text-right">
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={loading}>
                        Save
                    </Button>
                </FieldContainer>
            </Row>
        </Container>
    );
};

export default GuestForm;
