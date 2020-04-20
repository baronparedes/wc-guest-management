import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard.reducer';
import profileReducer from './profile.reducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    profile: profileReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
