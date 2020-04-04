import React from 'react';
import { Form, FormCheckProps } from 'react-bootstrap';

type Props = {
    checklist: string[];
    name?: string;
    register?: any;
    required?: boolean;
};

const FieldCheckList = (props: Props & FormCheckProps) => {
    let i = 0;
    return (
        <>
            {props.checklist.map(item => {
                i++;
                const id = `${props.name}${i}`;
                return (
                    <Form.Check
                        custom
                        required={props.required}
                        inline={props.inline}
                        type={props.type}
                        name={props.name}
                        ref={props.register}
                        key={id}
                        id={id}
                        label={item}
                        value={item}
                    />
                );
            })}
        </>
    );
};

export default FieldCheckList;
