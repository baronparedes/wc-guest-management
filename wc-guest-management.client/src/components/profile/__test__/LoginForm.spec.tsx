import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { generateFakeAuthResult } from '@utils/fake-models';
import routes from '@utils/routes';
import {
    renderWithProvider,
    renderWithProviderAndRouterAndRestful,
} from '@utils/test-renderers';
import { AuthResult } from 'Api';
import LoginForm from 'components/profile/LoginForm';
import faker from 'faker';
import 'isomorphic-fetch';
import nock from 'nock';
import React from 'react';

describe('LoginForm', () => {
    const base = 'http://localhost';
    const mockedAuthResult = generateFakeAuthResult();

    async function assertSignIn(result: AuthResult | string, responseCode = 200) {
        const username = faker.name.findName();
        const password = faker.random.alphaNumeric(15);

        nock(base)
            .post('/api/profile/auth')
            .matchHeader('authorization', /^Basic /i)
            .reply(responseCode, result);

        const target = renderWithProviderAndRouterAndRestful(<LoginForm />, base);

        const usernameInput = target.getByLabelText(/username/i) as HTMLInputElement;
        const passwordInput = target.getByLabelText(/password/i) as HTMLInputElement;

        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(passwordInput, { target: { value: password } });

        await waitFor(() => expect(usernameInput.value).toBe(username));
        await waitFor(() => expect(passwordInput.value).toBe(password));

        fireEvent.click(target.getByText(/sign in/i));
        await waitFor(() => expect(target.getByRole('progressbar')).toBeInTheDocument());

        return {
            ...target,
        };
    }

    afterEach(() => {
        cleanup();
        nock.cleanAll();
        jest.clearAllMocks();
    });

    it('should render', () => {
        const { getByAltText, getByLabelText } = renderWithProvider(<LoginForm />);
        expect(getByAltText('brand')).toBeInTheDocument();
        expect(getByLabelText(/username/i)).toBeInTheDocument();
        expect(getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should fail sigin in and show error', async () => {
        const { history, getByRole } = await assertSignIn('err', 500);
        await waitFor(() => expect(getByRole('error').textContent).toBe('err'));
        await waitFor(() => expect(history.location.pathname).not.toBe(routes.DASHBOARD));
    });

    it('should successfully sign in and redirect to dashboard page', async () => {
        const { store, history } = await assertSignIn(mockedAuthResult, 200);
        await waitFor(() => {
            expect(store.getState().profile.me).toStrictEqual(mockedAuthResult.profile);
            expect(store.getState().profile.token).toBe(mockedAuthResult.token);
        });
        await waitFor(() => expect(history.location.pathname).toBe(routes.DASHBOARD));
    });
});
