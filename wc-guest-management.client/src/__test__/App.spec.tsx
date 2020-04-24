import { renderWithProvider } from '@utils/test-renderers';
import App from 'App';
import React from 'react';

describe('App', () => {
    it('should render children correctly', () => {
        const actual = 'child';
        const { getByText } = renderWithProvider(<App>{actual}</App>);
        expect(getByText(actual, { exact: false })).toBeInTheDocument();
    });
});
