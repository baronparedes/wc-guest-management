import { Action, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';

const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useRootState: TypedUseSelectorHook<RootState> = useSelector;
export default store;
