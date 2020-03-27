import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
