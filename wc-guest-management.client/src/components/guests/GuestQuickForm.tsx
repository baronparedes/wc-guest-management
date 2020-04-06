import logo from '@assets/img/wc-logo-transparent.png';
import { Activity, Slot } from '@models';
import { formatDate } from '@utils/dates';
import { Guest } from 'Api';
import BoxStacked from 'components/@ui/BoxStacked';
import ErrorInfo from 'components/@ui/ErrorInfo';
import FieldChecklist from 'components/@ui/FieldChecklist';
import FieldContainer from 'components/@ui/FieldContainer';
import { DarkCol, IndentedCol } from 'components/@ui/StyledCol';
import {
    GuestButtonModalProps,
    withEditGuestButtonModal,
} from 'hoc/withEditGuestButtonModal';
import { usePostGuestForm } from 'hooks/usePostGuestForm';
import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { FaIdCardAlt } from 'react-icons/fa';

type FormProps = {
    age?: number | null;
    action?: Activity | null;
    worshipTime?: Slot | null;
    volunteer?: string;
};

const GuestQuickForm = (props: GuestButtonModalProps) => {
    const { loading, error, handleSubmit, onSubmit, register } = usePostGuestForm<
        FormProps
    >({
        defaultValues: {
            age: props.guest.age,
            action: props.guest.action,
            worshipTime: props.guest.worshipTime,
            volunteer: props.guest.volunteer,
        },
        id: props.guest._id as string,
        onPreSubmit: (formData: FormProps) => {
            let data = Object.assign({}, props.guest);
            if (!data.age) data.age = undefined;
            if (!data.action) data.age = undefined;
            if (!data.worshipTime) data.worshipTime = undefined;
            data = {
                ...data,
                ...formData,
            };
            return data;
        },
        onFormSaved: props.onFormSaved,
    });

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
                    label="visit date"
                    className="text-left m-0">
                    <div>
                        <h4 className="font-weight-bold float-left">
                            {formatDate(new Date(props.guest.visitDate))}
                        </h4>
                        <span className="text-muted float-right">{props.guest.series}</span>
                    </div>
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} label="guest" className="text-left m-0">
                    <div>
                        <h4 className="font-weight-bold float-left">{props.guest.guest}</h4>
                    </div>
                </FieldContainer>
            </Row>
            <Row>
                <FieldContainer as={Col} label="age">
                    <Form.Control
                        required
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
                <FieldContainer as={Col} label="time" className="m-0">
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
                        required
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

const FormWithModal = withEditGuestButtonModal(GuestQuickForm);
export const GuestQuickFormWithButtonModal = (props: Guest) => {
    return (
        <FormWithModal
            title="guest essential data"
            header="guest essential data"
            guest={props}
            variant="dark">
            <FaIdCardAlt />
        </FormWithModal>
    );
};
export default GuestQuickForm;
