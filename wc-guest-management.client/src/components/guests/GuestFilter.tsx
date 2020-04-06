import { getCurrentDateFormatted } from '@utils/dates';
import React from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import useForm from 'react-hook-form';

type Props = {
    onRefresh?: (criteria?: string, fromDate?: string) => void;
    disabled?: boolean;
};

type FormProps = {
    criteria?: string;
    fromDate?: string;
};

const GuestFilter = (props: Props & FormProps) => {
    const now = getCurrentDateFormatted();
    const { handleSubmit, register } = useForm<FormProps>({
        defaultValues: {
            criteria: props.criteria,
            fromDate: props.fromDate,
        },
    });

    const onSubmit = (formData: FormProps) => {
        props.onRefresh && props.onRefresh(formData.criteria, formData.fromDate);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Form.Group as={Col} sm={12} md={4} controlId="fromDate">
                    <Form.Control
                        required
                        ref={register}
                        name="fromDate"
                        size="lg"
                        type="date"
                        max={now}
                    />
                </Form.Group>
                <Form.Group as={Col} sm={12} md={8} controlId="criteria">
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
