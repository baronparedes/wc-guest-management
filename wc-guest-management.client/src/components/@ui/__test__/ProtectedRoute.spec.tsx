import routes from '@utils/routes';
import { renderWithProviderAndRouter } from '@utils/test-renderers';
import { Profile } from 'Api';
import ProtectedRoute from 'components/@ui/ProtectedRoute';
import React from 'react';
import { profileActions } from 'store/reducers/profile.reducer';

type Props = React.ComponentProps<typeof ProtectedRoute>;

describe('ProtectedRoute', () => {
    it('should redirect to login when token is null', () => {
        const SomeComponent = () => <div></div>;
        const { history } = renderWithProviderAndRouter(
            <ProtectedRoute component={SomeComponent} />
        );
        expect(history.location.pathname).toBe(routes.LOGIN);
    });

    it('should render component when user is logged in', () => {
        const SomeComponent = () => <div>Target Component</div>;
        const profile: Profile = {
            name: 'Joe',
            username: 'Joe@Test.com',
        };
        const token = 'auth_token';

        const { getByText } = renderWithProviderAndRouter(
            <ProtectedRoute component={SomeComponent} />,
            (store) => {
                store.dispatch(profileActions.signIn({ me: profile, token }));
            }
        );

        const actual = getByText('Target Component');
        expect(actual).toBeInTheDocument();
    });
});
