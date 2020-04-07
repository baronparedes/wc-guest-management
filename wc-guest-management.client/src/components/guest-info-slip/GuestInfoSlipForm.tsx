import { getCurrentDateFormatted, getCurrentTimeSlot } from '@utils/dates';
import { Guest, InfoSlip, useWelcome, WelcomeRequestBody } from 'Api';
import ErrorInfo from 'components/@ui/ErrorInfo';
import FieldContainer from 'components/@ui/FieldContainer';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import ConfirmedGuests from './ConfirmedGuests';

const initialState: InfoSlip = {
    visitDate: getCurrentDateFormatted(),
    guests: '',
    volunteer: '',
    tableNumber: undefined,
};

const GuestInfoSlipForm = () => {
    const [queued, setQueued] = useState<Guest[]>();
    const [name, setName] = useState<string>('');
    const { loading, error, mutate } = useWelcome({});
    const { handleSubmit, register, reset } = useForm<InfoSlip>({
        defaultValues: {
            ...initialState,
            worshipTime: getCurrentTimeSlot(),
        },
    });
    const onSubmit = (formData: InfoSlip) => {
        const body: WelcomeRequestBody = {
            print: false,
            infoSlip: formData,
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
                        <option>9 AM</option>
                        <option>12 NN</option>
                        <option>3 PM</option>
                        <option>6 PM</option>
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
