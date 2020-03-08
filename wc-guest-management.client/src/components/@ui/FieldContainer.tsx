import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
    label: React.ReactNode;
};

const FieldContainer: React.FC<Props> = props => {
    return (
        <Form.Group>
            <Form.Label className="text-muted">
                {props.label}
            </Form.Label>
            {props.children}
        </Form.Group>
    );
};

export default FieldContainer;
