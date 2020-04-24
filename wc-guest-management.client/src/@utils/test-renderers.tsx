import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'store';

export function renderWithProviderAndRouter(
    ui: React.ReactElement,
    setupStore?: (store: ReturnType<typeof createStore>) => void,
    setupHistory?: (history: ReturnType<typeof createMemoryHistory>) => void
) {
    const history = createMemoryHistory();
    const store = createStore();

    setupStore && setupStore(store);
    setupHistory && setupHistory(history);

    const Wrapper: React.FC = ({ children }) => (
        <Provider store={store}>
            <Router history={history}>{children}</Router>
        </Provider>
    );
    const target = render(ui, { wrapper: Wrapper });

    return {
        ...target,
        store,
        history,
    };
}

export function renderWithProvider(
    ui: React.ReactElement,
    setupStore?: (store: ReturnType<typeof createStore>) => void
) {
    const store = createStore();
    setupStore && setupStore(store);
    const Wrapper: React.FC = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    );
    const target = render(ui, { wrapper: Wrapper });

    return {
        ...target,
        store,
    };
}

export function renderWithRouter(
    ui: React.ReactElement,
    setupHistory?: (history: ReturnType<typeof createMemoryHistory>) => void
) {
    const history = createMemoryHistory();
    setupHistory && setupHistory(history);
    const Wrapper: React.FC = ({ children }) => (
        <Router history={history}>{children}</Router>
    );
    return {
        ...render(ui, { wrapper: Wrapper }),
        history,
    };
}
