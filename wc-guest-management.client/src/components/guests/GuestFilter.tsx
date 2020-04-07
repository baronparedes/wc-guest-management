import { Slot } from '@models';
import { getCurrentDateFormatted } from '@utils/dates';
import React from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import useForm from 'react-hook-form';

type Props = {
    onRefresh?: (criteria?: string, fromDate?: string, slot?: Slot) => void;
    disabled?: boolean;
};

type FormProps = {
    criteria?: string;
    fromDate?: string;
    slot?: string;
};

const GuestFilter = (props: Props & FormProps) => {
    const emptySlot = 'All Slots';
    const now = getCurrentDateFormatted();
    const { handleSubmit, register } = useForm<FormProps>({
        defaultValues: {
            criteria: props.criteria,
            fromDate: props.fromDate,
            slot: props.slot,
        },
    });
    const onSubmit = (formData: FormProps) => {
        let slot: Slot | undefined = undefined;
        if (formData.slot !== emptySlot) {
            slot = formData.slot as Slot;
        }
        props.onRefresh && props.onRefresh(formData.criteria, formData.fromDate, slot);
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Form.Group as={Col} sm={12} md={3} controlId="fromDate">
                    <Form.Control
                        required
                        ref={register}
                        name="fromDate"
                        size="lg"
                        type="date"
                        max={now}
                    />
                </Form.Group>
                <Form.Group as={Col} sm={12} md={3} controlId="slot">
                    <Form.Control ref={register} as="select" name="slot" size="lg" required>
                        <option>{emptySlot}</option>
                        <option>9 AM</option>
                        <option>12 NN</option>
                        <option>3 PM</option>
                        <option>6 PM</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={6} controlId="criteria">
                    <InputGroup>
                        <Form.Control
                            ref={register}
                            name="criteria"
                            size="lg"
                            placeholder="search criteria"
                        />
                        <InputGroup.Append>
                            <Button
                                disabled={props.disabled}
                                variant="primary"
                                type="submit"
                                size="lg">
                                Refresh
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        </Form>
    );
};

export default GuestFilter;
