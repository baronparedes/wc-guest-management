import React from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { getCurrentDateFormatted } from '../../@utils/dates';

type Props = {
    onRefresh?: (criteria?: string, visitDate?: string) => void;
    criteria?: string;
    visitDate?: string;
};

const BackroomFilter = (props: Props) => {
    const now = getCurrentDateFormatted();
    const { handleSubmit, register } = useForm<Props>({
        defaultValues: {
            criteria: props.criteria,
            visitDate: props.visitDate
        }
    });

    const onSubmit = (formData: Props) => {
        props.onRefresh &&
            props.onRefresh(formData.criteria, formData.visitDate);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Form.Group
                    as={Col}
                    sm={12}
                    md={4}
                    controlId="visitDate">
                    <Form.Control
                        required
                        ref={register}
                        name="visitDate"
                        size="lg"
                        type="date"
                        max={now}
                    />
                </Form.Group>
                <Form.Group
                    as={Col}
                    sm={12}
                    md={8}
                    controlId="criteria">
                    <InputGroup>
                        <Form.Control
                            ref={register}
                            name="criteria"
                            size="lg"
                            placeholder="search"
                        />
                        <InputGroup.Append>
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg">
                                Submit
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        </Form>
    );
};

export default BackroomFilter;
