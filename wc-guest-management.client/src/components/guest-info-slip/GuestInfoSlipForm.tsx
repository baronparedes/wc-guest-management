import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { getCurrentDateFormatted } from '../../@utils/dates';
import {
    Guest,
    InfoSlip,
    useWelcome,
    WelcomeRequestBody
} from '../../Api';
import ErrorInfo from '../@ui/ErrorInfo';
import ConfirmedGuests from './ConfirmedGuests';

const initialState: InfoSlip = {
    visitDate: getCurrentDateFormatted(),
    guests: '',
    volunteer: '',
    tableNumber: undefined
};

const GuestInfoSlipForm = () => {
    const [queued, setQueued] = useState<Guest[]>();
    const [name, setName] = useState<string>('');
    const { loading, error, mutate } = useWelcome({});
    const { handleSubmit, register, reset } = useForm<InfoSlip>({
        defaultValues: initialState
    });
    const onSubmit = (formData: InfoSlip) => {
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
        return (
            <ConfirmedGuests
                guests={queued}
                ok={handleOnReset}
                volunteer={name}
            />
        );
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Form.Group
                    as={Col}
                    sm={12}
                    md={6}
                    controlId="visitDate">
                    <Form.Label>visit date</Form.Label>
                    <Form.Control
                        required
                        ref={register}
                        name="visitDate"
                        size="lg"
                        type="date"
                        max={initialState.visitDate}
                    />
                </Form.Group>
                <Form.Group
                    as={Col}
                    sm={12}
                    md={6}
                    controlId="tableNumber">
                    <Form.Label>table number</Form.Label>
                    <Form.Control
                        required
                        ref={register}
                        name="tableNumber"
                        size="lg"
                        type="number"
                        placeholder="table number"
                    />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="volunteer">
                <Form.Label>volunteer</Form.Label>
                <Form.Control
                    required
                    ref={register}
                    name="volunteer"
                    size="lg"
                    placeholder="volunteer"
                />
            </Form.Group>
            <Form.Group controlId="guests">
                <Form.Label>guests</Form.Label>
                <Form.Control
                    required
                    ref={register}
                    name="guests"
                    size="lg"
                    placeholder="guests"
                    as="textarea"
                    rows={5}
                />
                <Form.Text className="text-muted">
                    You can write multiple guests in each line
                </Form.Text>
            </Form.Group>
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
                <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading}>
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
};

export default GuestInfoSlipForm;
