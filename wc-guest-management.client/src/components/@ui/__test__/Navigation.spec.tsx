import { fireEvent, render } from '@testing-library/react';
import routes from '@utils/routes';
import Navigation from 'components/@ui/Navigation';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

jest.mock('components/@ui/NavCurrentProfile', () => 'mocked-component');

describe('Navigation', () => {
    function renderComponent() {
        const history = createMemoryHistory();
        const target = render(
            <Router history={history}>
                <Navigation />
            </Router>
        );
        return {
            ...target,
            history,
        };
    }

    afterAll(jest.resetModules);

    it('should render without crashing', () => {
        renderComponent();
    });

    it('should redirect correctly when a navigation link is clicked', () => {
        const { getByText, history } = renderComponent();
        const targetLinks = [
            { label: 'dashboard', to: routes.DASHBOARD },
            { label: 'guests', to: routes.GUESTS },
            { label: 'guest info slip', to: routes.GUEST_INFO_SLIP },
        ];
        targetLinks.forEach((target) => {
            const link = getByText(target.label);
            fireEvent.click(link);
            expect(history.location.pathname).toBe(target.to);
        });
    });

    it('should have a brand logo', () => {
        const { container } = renderComponent();
        const navbarBrand = container.querySelector('.navbar-brand');
        expect(navbarBrand).toBeInTheDocument();
    });
});
