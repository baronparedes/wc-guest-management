import { render } from '@testing-library/react';
import App from 'App';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';

describe('App', () => {
    it('should render children correctly', () => {
        const actual = 'child';
        const { getByText } = render(
            <Provider store={store}>
                <App>{actual}</App>
            </Provider>
        );
        expect(getByText(actual, { exact: false })).toBeInTheDocument();
    });
});
