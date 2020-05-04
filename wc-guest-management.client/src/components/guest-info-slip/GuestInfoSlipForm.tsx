import { getCurrentDateFormatted, getCurrentTimeSlot } from '@utils/dates';
import { Guest, InfoSlip, useWelcome, WelcomeRequestBody } from 'Api';
import ErrorInfo from 'components/@ui/ErrorInfo';
import FieldContainer from 'components/@ui/FieldContainer';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import ConfirmedGuests from './ConfirmedGuests';

const now = getCurrentDateFormatted();
const initialState: InfoSlip = {
    visitDate: now,
    guests: '',
    volunteer: '',
    tableNumber: undefined,
    worshipTime: getCurrentTimeSlot(),
};

const GuestInfoSlipForm = () => {
    const [queued, setQueued] = useState<Guest[]>();
    const [name, setName] = useState<string>('');
    const { loading, error, mutate } = useWelcome({});
    const { handleSubmit, register, reset } = useForm<InfoSlip>({
        defaultValues: {
            ...initialState,
        },
    });
    const onSubmit = (formData: InfoSlip) => {
        const body: WelcomeRequestBody = {
            print: false,
            infoSlip: formData,
        };
        mutate(body)
            .then((data) => {
                setName(formData.volunteer);
                setQueued(data);
            })
            .catch((err) => {});
    };
    const handleOnReset = () => {
        reset(initialState);
        setQueued(undefined);
    };
    if (queued) {
        return <ConfirmedGuests guests={queued} ok={handleOnReset} volunteer={name} />;
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} role="form">
            <Form.Row>
                <FieldContainer
                    as={Col}
                    sm={12}
                    md={4}
                    label="visit date"
                    controlId="visitDate">
                    <Form.Control
                        required
                        ref={register({
                            required: true,
                            max: {
                                value: now,
                                message: `Value should be ${now} or earlier`,
                            },
                        })}
                        name="visitDate"
                        size="lg"
                        type="date"
                        max={initialState.visitDate}
                    />
                </FieldContainer>
                <FieldContainer
                    as={Col}
                    sm={12}
                    md={4}
                    label="time slot"
                    controlId="timeSlot">
                    <Form.Control
                        required
                        ref={register({ required: true })}
                        as="select"
                        name="worshipTime"
                        size="lg">
                        <option>9 AM</option>
                        <option>12 NN</option>
                        <option>3 PM</option>
                        <option>6 PM</option>
                    </Form.Control>
                </FieldContainer>
                <FieldContainer
                    as={Col}
                    sm={12}
                    md={4}
                    label="table number"
                    controlId="talbeNumber">
                    <Form.Control
                        required
                        ref={register({ required: true })}
                        name="tableNumber"
                        size="lg"
                        type="number"
                        placeholder="table number"
                    />
                </FieldContainer>
            </Form.Row>
            <FieldContainer label="volunteer" controlId="volunteer">
                <Form.Control
                    required
                    ref={register({ required: true })}
                    name="volunteer"
                    size="lg"
                    placeholder="volunteer"
                />
            </FieldContainer>
            <FieldContainer label="guests" controlId="guests">
                <Form.Control
                    required
                    ref={register({ required: true })}
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
