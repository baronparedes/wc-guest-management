import { fireEvent } from '@testing-library/react';
import routes from '@utils/routes';
import { renderWithRouter } from '@utils/test-renderers';
import Navigation from 'components/@ui/Navigation';
import React from 'react';

jest.mock('components/@ui/NavCurrentProfile', () => 'mocked-component');

describe('Navigation', () => {
    afterAll(jest.resetModules);

    it('should render without crashing', () => {
        renderWithRouter(<Navigation />);
    });

    it('should redirect correctly when a navigation link is clicked', () => {
        // arrange
        const { getByText, history } = renderWithRouter(<Navigation />);
        const targetLinks = [
            { label: 'dashboard', to: routes.DASHBOARD },
            { label: 'guests', to: routes.GUESTS },
            { label: 'guest info slip', to: routes.GUEST_INFO_SLIP },
        ];

        // act
        targetLinks.forEach((target) => {
            // assert
            const link = getByText(target.label);
            fireEvent.click(link);
            expect(history.location.pathname).toBe(target.to);
        });
    });

    it('should have a brand logo', () => {
        const { container } = renderWithRouter(<Navigation />);
        const navbarBrand = container.querySelector('.navbar-brand');
        expect(navbarBrand).toBeInTheDocument();
    });
});
