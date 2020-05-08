import { Activity, Slot } from '@models';
import ErrorInfo from 'components/@ui/ErrorInfo';
import FieldContainer from 'components/@ui/FieldContainer';
import { IndentedCol } from 'components/@ui/StyledCol';
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

type FormProps = {
    age?: number | null;
    action?: Activity | null;
    worshipTime?: Slot | null;
    volunteer?: string;
};

const GuestFormEssential = (props: GuestButtonModalProps) => {
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
                <GuestFormVisitDate
                    as={IndentedCol}
                    visitDate={props.guest.visitDate}
                    series={props.guest.series}
                />
            </Row>
            <Row>
                <FieldContainer as={Col} label="guest" className="text-left m-0">
                    <div>
                        <h4 className="font-weight-bold float-left">{props.guest.guest}</h4>
                    </div>
                </FieldContainer>
            </Row>
            <Row>
                <GuestFormAge register={register({ required: true })} />
            </Row>
            <Row>
                <GuestFormWorshipTime register={register({ required: true })} />
            </Row>
            <Row>
                <GuestFormWelcomeNotes register={register({ required: true })} />
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

export default GuestFormEssential;
