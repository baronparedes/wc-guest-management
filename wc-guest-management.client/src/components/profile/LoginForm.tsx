import routes from '@utils/routes';
import { useAuth } from 'Api';
import Brand from 'components/@ui/Brand';
import ErrorInfo from 'components/@ui/ErrorInfo';
import FieldContainer from 'components/@ui/FieldContainer';
import Loading from 'components/@ui/Loading';
import RoundedPanel from 'components/@ui/RoundedPanel';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useRootState } from 'store';
import { profileActions } from 'store/reducers/profile.reducer';
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
    const dispatch = useDispatch();
    const { token } = useRootState((state) => state.profile);
    const { mutate, loading, error } = useAuth({});
    const { handleSubmit, register } = useForm<FormData>();
    const onSubmit = (formData: FormData) => {
        const credentials = new Buffer(
            `${formData.username}:${formData.password}`
        ).toString('base64');
        mutate(undefined, { headers: { Authorization: `Basic ${credentials}` } })
            .then((data) => {
                if (data) {
                    dispatch(
                        profileActions.signIn({
                            me: data.profile,
                            token: data.token,
                        })
                    );
                }
            })
            .catch(() => {});
    };
    if (token) {
        return <Redirect to={routes.DASHBOARD} />;
    }
    return (
        <LoginContainer>
            <Brand height="160px" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FieldContainer as={Col} label="username" controlId="username">
                    <Form.Control
                        disabled={loading}
                        required
                        ref={register}
                        name="username"
                        placeholder="username"
                        size="lg"
                    />
                </FieldContainer>
                <FieldContainer as={Col} label="password" controlId="password">
                    <Form.Control
                        disabled={loading}
                        required
                        ref={register}
                        name="password"
                        type="password"
                        placeholder="password"
                        size="lg"
                    />
                </FieldContainer>
                {error && (
                    <Col>
                        <ErrorInfo>{error.data as string}</ErrorInfo>
                    </Col>
                )}
                <Col className="text-right pb-3">
                    <Button variant="primary" type="submit" size="lg" disabled={loading}>
                        {loading && (
                            <div className="float-left pr-2">
                                <Loading size={12} />
                            </div>
                        )}
                        Sign In
                    </Button>
                </Col>
            </Form>
        </LoginContainer>
    );
};

export default LoginForm;
