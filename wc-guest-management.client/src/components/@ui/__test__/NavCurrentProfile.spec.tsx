import { fireEvent, render } from '@testing-library/react';
import { Profile } from 'Api';
import NavCurrentProfile from 'components/@ui/NavCurrentProfile';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'store';
import { profileActions } from 'store/reducers/profile.reducer';

describe('NavCurrentProfile', () => {
    function renderComponent(history: any, store: any) {
        return render(
            <Provider store={store}>
                <Router history={history}>
                    <NavCurrentProfile />
                </Router>
            </Provider>
        );
    }

    function renderLoggedIn(profile: Profile, token: string) {
        // arrange
        const history = createMemoryHistory();
        const store = createStore();
        store.dispatch(profileActions.signIn({ me: profile, token: token }));

        //act
        const { getByText, container } = renderComponent(history, store);

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
        const history = createMemoryHistory();
        const store = createStore();
        renderComponent(history, store);
        expect(history.location.pathname).toBe('/login');
    });

    it('should display current profile', () => {
        // arrange
        const profile: Profile = {
            name: 'Joe',
            username: 'Joe@Test.com',
        };
        const token = 'auth_token';

        // act
        const target = renderLoggedIn(profile, token);

        // assert
        expect(target.navbarText).toBeInTheDocument();
        expect(target.navbarText).toContainElement(target.welcomeText);
        expect(target.navbarText).toContainElement(target.profileText);
        expect(target.navbarText).toContainElement(target.signOutButton);
        expect(target.profileText).toHaveTextContent(profile.name);
        expect(target.profileText).toHaveClass('text-bold');
        expect(target.profileText).toHaveClass('text-white');
    });

    it('should redirect to login when Sign Out button is clicked', () => {
        // arrange
        const profile: Profile = {
            name: 'Joe',
            username: 'Joe@Test.com',
        };
        const token = 'auth_token';

        // act
        const { history, signOutButton } = renderLoggedIn(profile, token);
        fireEvent.click(signOutButton);

        // assert
        expect(history.location.pathname).toBe('/login');
    });
});
