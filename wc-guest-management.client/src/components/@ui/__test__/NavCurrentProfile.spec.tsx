import { fireEvent } from '@testing-library/react';
import routes from '@utils/routes';
import { renderWithProviderAndRouter } from '@utils/test-renderers';
import { Profile } from 'Api';
import NavCurrentProfile from 'components/@ui/NavCurrentProfile';
import React from 'react';
import { profileActions } from 'store/reducers/profile.reducer';

describe('NavCurrentProfile', () => {
    function renderLoggedIn(profile: Profile, token: string) {
        const { getByText, container, history, store } = renderWithProviderAndRouter(
            <NavCurrentProfile />,
            (initStore) => {
                initStore.dispatch(profileActions.signIn({ me: profile, token: token }));
            }
        );

        const navbarText = container.querySelector('.navbar-text');
        const welcomeText = getByText(/Welcome!/);
        const profileText = getByText(profile.name);
        const signOutButton = getByText('Sign Out');

        return {
            history,
            store,
            navbarText,
            welcomeText,
            profileText,
            signOutButton,
        };
    }

    it('should redirect to login when token is null', () => {
        const { history } = renderWithProviderAndRouter(<NavCurrentProfile />);
        expect(history.location.pathname).toBe(routes.LOGIN);
    });

    it('should display current profile', () => {
        const profile: Profile = {
            name: 'Joe',
            username: 'Joe@Test.com',
        };
        const token = 'auth_token';

        const target = renderLoggedIn(profile, token);

        expect(target.navbarText).toBeInTheDocument();
        expect(target.navbarText).toContainElement(target.welcomeText);
        expect(target.navbarText).toContainElement(target.profileText);
        expect(target.navbarText).toContainElement(target.signOutButton);
        expect(target.profileText).toHaveTextContent(profile.name);
        expect(target.profileText).toHaveClass('text-bold');
        expect(target.profileText).toHaveClass('text-white');
    });

    it('should redirect to login when Sign Out button is clicked', () => {
        const profile: Profile = {
            name: 'Joe',
            username: 'Joe@Test.com',
        };
        const token = 'auth_token';

        const { history, signOutButton } = renderLoggedIn(profile, token);
        fireEvent.click(signOutButton);

        expect(history.location.pathname).toBe(routes.LOGIN);
    });
});
