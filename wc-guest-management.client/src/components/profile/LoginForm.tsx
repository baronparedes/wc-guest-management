import Brand from 'components/@ui/Brand';
import FieldContainer from 'components/@ui/FieldContainer';
import RoundedPanel from 'components/@ui/RoundedPanel';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import styled from 'styled-components';

const LoginContainer = styled(RoundedPanel)`
    max-width: 500px;
    margin-top: 3em;
`;

type FormData = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const onSubmit = (formData: FormData) => {
        console.log(formData);
    };

    return (
        <LoginContainer>
            <Brand height="160px" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FieldContainer as={Col} label="username">
                    <Form.Control
                        required
                        ref={register}
                        name="username"
                        id="form-username"
                        placeholder="username"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} label="password">
                    <Form.Control
                        required
                        ref={register}
                        name="password"
                        id="form-password"
                        type="password"
                        placeholder="password"
                        size="lg"
                    />
                </FieldContainer>
                <Col className="text-right pb-3">
                    <Button variant="primary" type="submit" size="lg">
                        Login
                    </Button>
                </Col>
            </Form>
        </LoginContainer>
    );
};

export default LoginForm;
