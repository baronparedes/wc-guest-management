import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guest } from 'Api';

export type DashboardState = {
    data?: Guest[];
    savedGuest?: Guest;
};

const initialState: DashboardState = {};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        dataFetched: (state, action: PayloadAction<Guest[]>) => {
            state.data = action.payload;
        },
        guestSaved: (state, action: PayloadAction<Guest>) => {
            state.savedGuest = action.payload;
        },
    },
});

const { actions, reducer } = dashboardSlice;
export const dashboardActions = {
    ...actions,
};
export default reducer;
