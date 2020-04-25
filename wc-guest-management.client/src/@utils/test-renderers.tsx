import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { RestfulProvider } from 'restful-react';
import { createStore } from 'store';

export function getRestfulProviderWrapper(base: string) {
    const RestfulProviderWrapper: React.FC = ({ children }) => {
        return <RestfulProvider base={base}>{children}</RestfulProvider>;
    };
    return {
        base,
        RestfulProviderWrapper,
    };
}

export function getProviderWrapper(
    setupStore?: (store: ReturnType<typeof createStore>) => void
) {
    const store = createStore();
    setupStore && setupStore(store);
    const ProviderWrapper: React.FC<any> = (props) => (
        <Provider store={store}>{props.children}</Provider>
    );
    return {
        store,
        ProviderWrapper,
    };
}

export function getRouterWrapper(
    setupHistory?: (history: ReturnType<typeof createMemoryHistory>) => void
) {
    const history = createMemoryHistory();
    setupHistory && setupHistory(history);
    const RouterWrapper: React.FC<any> = (props) => (
        <Router history={history}>{props.children}</Router>
    );

    return {
        history,
        RouterWrapper,
    };
}

export function renderWithProviderAndRouter(
    ui: React.ReactElement,
    setupStore?: (store: ReturnType<typeof createStore>) => void,
    setupHistory?: (history: ReturnType<typeof createMemoryHistory>) => void
) {
    const { store, ProviderWrapper } = getProviderWrapper(setupStore);
    const { history, RouterWrapper } = getRouterWrapper(setupHistory);
    const Wrapper: React.FC<any> = (props) => (
        <ProviderWrapper>
            <RouterWrapper>{props.children}</RouterWrapper>
        </ProviderWrapper>
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
    const { store, ProviderWrapper } = getProviderWrapper(setupStore);
    const target = render(ui, { wrapper: ProviderWrapper });
    return {
        ...target,
        store,
    };
}

export function renderWithRouter(
    ui: React.ReactElement,
    setupHistory?: (history: ReturnType<typeof createMemoryHistory>) => void
) {
    const { history, RouterWrapper } = getRouterWrapper(setupHistory);
    return {
        ...render(ui, { wrapper: RouterWrapper }),
        history,
    };
}

export function renderHookWithProvider<P, R>(
    callback: (props: P) => R,
    setupStore?: (store: ReturnType<typeof createStore>) => void
) {
    const { store, ProviderWrapper } = getProviderWrapper(setupStore);
    const target = renderHook(callback, { wrapper: ProviderWrapper });
    return {
        ...target,
        store,
    };
}

export function renderHookWithRestfulProvider<P, R>(
    callback: (props: P) => R,
    base: string
) {
    const { RestfulProviderWrapper } = getRestfulProviderWrapper(base);
    const target = renderHook(callback, { wrapper: RestfulProviderWrapper });
    return {
        ...target,
    };
}
