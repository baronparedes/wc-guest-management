import React from 'react';
import { ColProps, Form } from 'react-bootstrap';

type Props = {
    label: React.ReactNode;
    as?: React.ElementType;
    className?: string;
};

const FieldContainer: React.FC<Props & ColProps> = props => {
    return (
        <Form.Group {...props}>
            <Form.Label className="text-muted">
                {props.label}
            </Form.Label>
            {props.children}
        </Form.Group>
    );
};

export default FieldContainer;
