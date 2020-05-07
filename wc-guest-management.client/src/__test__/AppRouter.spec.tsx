import routes from '@utils/routes';
import { renderWithProviderAndRouter, renderWithRouter } from '@utils/test-renderers';
import AppRouter from 'AppRouter';
import React from 'react';
import { profileActions } from 'store/reducers/profile.reducer';

jest.mock('components/dashboard/DashboardView', () => () => {
    return <div>dashboard-view</div>;
});
jest.mock('components/guest-info-slip/GuestInfoSlipView', () => () => {
    return <div>guest-info-slip-view</div>;
});
jest.mock('components/guests/GuestView', () => () => {
    return <div>guest-view</div>;
});
jest.mock('components/profile/LoginView', () => () => {
    return <div>login-view</div>;
});
jest.mock('components/@ui/Header', () => () => 'header');

describe('AppRouter', () => {
    afterEach(jest.resetAllMocks);

    function assertRouteComponent(route: string, text: string, header: boolean = false) {
        const { history, getByText } = renderWithRouter(<AppRouter />, (initHistory) => {
            initHistory.push(route);
        });
        getByText(text);
        header && getByText('header');
        expect(history.location.pathname).toBe(route);
    }

    const authenticatedComponents = [
        { route: routes.DASHBOARD, text: 'dashboard-view' },
        { route: routes.GUESTS, text: 'guest-view' },
    ];

    it('should render', () => {
        renderWithRouter(<AppRouter />);
    });

    it(`should correctly display components [404]`, () => {
        assertRouteComponent('/404', 'Page Not Found - 404', true);
    });

    it(`should correctly display components [${routes.GUEST_INFO_SLIP}]`, () => {
        assertRouteComponent(routes.GUEST_INFO_SLIP, 'guest-info-slip-view');
    });

    it(`should correctly display components [${routes.LOGIN}]`, () => {
        assertRouteComponent(routes.LOGIN, 'login-view');
    });

    authenticatedComponents.forEach((target) => {
        it(`should redirect to login when token is null [${target.route}]`, () => {
            const { history, getByText } = renderWithProviderAndRouter(
                <AppRouter />,
                undefined,
                (initHistory) => initHistory.push(target.route)
            );
            getByText('login-view');
            expect(history.location.pathname).toBe(routes.LOGIN);
        });
    });

    authenticatedComponents.forEach((target) => {
        it(`should correctly display components [${target.route}]`, () => {
            const { history, getByText } = renderWithProviderAndRouter(
                <AppRouter />,
                (store) => store.dispatch(profileActions.signIn({ token: 'auth_token' })),
                (initHistory) => initHistory.push(target.route)
            );
            getByText(target.text);
            getByText('header');
            expect(history.location.pathname).toBe(target.route);
        });
    });
});
