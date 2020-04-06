import { getCurrentDateFormatted } from '@utils/dates';
import FieldContainer from 'components/@ui/FieldContainer';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';

type Props = {
    onRefresh?: (fromDate: string, toDate?: string) => void;
    disabled?: boolean;
};

type FormProps = { fromDate: string; toDate?: string };

const DashboardFilter = (props: Props) => {
    const now = getCurrentDateFormatted();
    const { handleSubmit, register } = useForm<FormProps>({
        defaultValues: {
            fromDate: now,
        },
    });
    const onSubmit = (formData: FormProps) => {
        props.onRefresh && props.onRefresh(formData.fromDate, formData.toDate);
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row className="d-print-none">
                <Col className="text-right">
                    <span className="text-muted mr-2">
                        data as of {new Date().toLocaleDateString()}{' '}
                        {new Date().toLocaleTimeString()}
                    </span>
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={props.disabled}>
                        Refresh
                    </Button>
                </Col>
            </Form.Row>
            <Form.Row>
                <FieldContainer as={Col} sm={12} md={6} label="from">
                    <Form.Control
                        disabled={props.disabled}
                        required
                        ref={register}
                        name="fromDate"
                        size="lg"
                        type="date"
                        max={now}
                    />
                </FieldContainer>
                <FieldContainer as={Col} sm={12} md={6} label="to">
                    <Form.Control
                        disabled={props.disabled}
                        ref={register}
                        name="toDate"
                        size="lg"
                        type="date"
                        max={now}
                    />
                </FieldContainer>
            </Form.Row>
        </Form>
    );
};

export default DashboardFilter;
