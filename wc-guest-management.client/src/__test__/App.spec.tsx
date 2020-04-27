import { renderWithProvider } from '@utils/test-renderers';
import App from 'App';
import * as faker from 'faker';
import React from 'react';

describe('App', () => {
    it('should render', () => {
        const actual = faker.lorem.sentences();
        const { getByText } = renderWithProvider(<App>{actual}</App>);
        expect(getByText(actual, { exact: false })).toBeInTheDocument();
    });
});
