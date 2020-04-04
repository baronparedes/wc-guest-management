import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { Slot } from '../../@types/models';
import { getCurrentDateFormatted } from '../../@utils/dates';
import { Guest, InfoSlip, useWelcome, WelcomeRequestBody } from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import FieldContainer from '../@ui/FieldContainer';
import ConfirmedGuests from './ConfirmedGuests';

const initialState: InfoSlip = {
    visitDate: getCurrentDateFormatted(),
    guests: '',
    volunteer: '',
    tableNumber: undefined
};

function getWorshipTime(): Slot {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return 'AM';
    if (hour < 15) return 'NN';
    if (hour < 18) return 'PM';
    return 'NA';
}

const GuestInfoSlipForm = () => {
    const [queued, setQueued] = useState<Guest[]>();
    const [name, setName] = useState<string>('');
    const { loading, error, mutate } = useWelcome({});
    const { handleSubmit, register, reset } = useForm<InfoSlip>({
        defaultValues: {
            ...initialState,
            worshipTime: getWorshipTime()
        }
    });
    const onSubmit = (formData: InfoSlip) => {
        console.log(formData);
        const body: WelcomeRequestBody = {
            print: false,
            infoSlip: formData
        };
        setName(formData.volunteer);
        mutate(body).then(setQueued);
    };
    const handleOnReset = () => {
        reset(initialState);
        setQueued(undefined);
    };
    if (queued) {
        return <ConfirmedGuests guests={queued} ok={handleOnReset} volunteer={name} />;
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <FieldContainer as={Col} sm={12} md={4} label="visit date">
                    <Form.Control
                        required
                        ref={register}
                        name="visitDate"
                        size="lg"
                        type="date"
                        max={initialState.visitDate}
                    />
                </FieldContainer>
                <FieldContainer as={Col} sm={12} md={4} label="time slot">
                    <Form.Control
                        ref={register}
                        as="select"
                        name="worshipTime"
                        size="lg"
                        required>
                        <option>AM</option>
                        <option>NN</option>
                        <option>PM</option>
                        <option>NA</option>
                    </Form.Control>
                </FieldContainer>
                <FieldContainer as={Col} sm={12} md={4} label="table number">
                    <Form.Control
                        required
                        ref={register}
                        name="tableNumber"
                        size="lg"
                        type="number"
                        placeholder="table number"
                    />
                </FieldContainer>
            </Form.Row>
            <FieldContainer label="volunteer">
                <Form.Control
                    required
                    ref={register}
                    name="volunteer"
                    size="lg"
                    placeholder="volunteer"
                />
            </FieldContainer>
            <FieldContainer label="guests">
                <Form.Control
                    required
                    ref={register}
                    name="guests"
                    size="lg"
                    placeholder="guests"
                    as="textarea"
                    rows={6}
                />
                <Form.Text className="text-muted">
                    You can write multiple guests in each line
                </Form.Text>
            </FieldContainer>
            {error && <ErrorInfo>{error.data as string}</ErrorInfo>}
            <Form.Group as={Col} className="text-right">
                <Button
                    onClick={handleOnReset}
                    variant="secondary"
                    type="button"
                    size="lg"
                    className="mr-2"
                    disabled={loading}>
                    Clear
                </Button>
                <Button variant="primary" type="submit" size="lg" disabled={loading}>
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
};

export default GuestInfoSlipForm;
