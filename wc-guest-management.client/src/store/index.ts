import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';
import { dashboardActions } from './reducers/dashboard.reducer';

const store = configureStore({
    reducer: rootReducer
});

store.dispatch(dashboardActions.get());

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
>;

export default store;
