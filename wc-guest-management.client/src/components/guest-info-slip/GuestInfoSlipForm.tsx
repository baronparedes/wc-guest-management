import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Models } from '../../@types/models';
import { getCurrentDateFormatted } from '../../@utils/dates';
import routes from '../../@utils/routes';
import { dashboardActions } from '../../store/reducers/dashboard.reducer';

const initialState: Models.InfoSlip = {
    visitDate: getCurrentDateFormatted(),
    guests: '',
    volunteer: '',
    tableNumber: undefined
};

const GuestInfoForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { handleSubmit, register, reset } = useForm<Models.InfoSlip>({
        defaultValues: initialState
    });
    const onSubmit = (data: Models.InfoSlip) => {
        dispatch(dashboardActions.addGuest(data));
        history.push(routes.ROOT); //TODO: for demo only, remove after
        //if save succeded
        // handleOnReset();
    };
    const handleOnReset = () => {
        reset(initialState);
    };
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
            <Form.Group as={Col} className="text-right">
                <Button
                    onClick={handleOnReset}
                    variant="secondary"
                    type="button"
                    size="lg"
                    className="mr-2">
                    Clear
                </Button>
                <Button variant="primary" type="submit" size="lg">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
};

export default GuestInfoForm;
