import { combineReducers } from '@reduxjs/toolkit';
import backroomReducer from './backroom.reducer';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    backroom: backroomReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
