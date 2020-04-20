import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
    me?: string;
    token?: string;
};

const initialState: State = {};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loggedIn: (state, action: PayloadAction<string>) => {
            state.me = action.payload;
            state.token = action.payload;
        },
        loggedOut: (state, action: PayloadAction<string>) => {
            state.me = undefined;
            state.token = undefined;
        },
    },
});

const { actions, reducer } = profileSlice;
export const profileActions = {
    ...actions,
};
export default reducer;
