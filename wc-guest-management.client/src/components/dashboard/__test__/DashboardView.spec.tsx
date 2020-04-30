import { render } from '@testing-library/react';
import DashboardView from 'components/dashboard/DashboardView';
import React from 'react';

jest.mock('components/dashboard/DashboardContainer', () => () => {
    return <div>mocked-component</div>;
});

describe('DashboardView', () => {
    it('should render with a heading', () => {
        const { getByText } = render(<DashboardView />);
        expect(getByText(/dashboard/i)).toBeInTheDocument();
        expect(getByText(/mocked-component/i)).toBeInTheDocument();
    });
});
