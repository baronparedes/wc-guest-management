import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'Api';
import { AppThunk } from 'store';

type State = {
    me?: Profile;
    token?: string;
};

const WC_PROFILE_KEY = 'WC_PROFILE_KEY';

export const getProfileFromLocalStorage = () => {
    const state = localStorage.getItem(WC_PROFILE_KEY);
    if (state) {
        return {
            ...JSON.parse(state),
        };
    }
    return {};
};

const initialState: State = getProfileFromLocalStorage();

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<State>) => {
            state.me = action.payload.me;
            state.token = action.payload.token;
        },
        signOut: (state) => {
            state.me = undefined;
            state.token = undefined;
        },
    },
});

const signIn = (payload: State): AppThunk => (dispatch) => {
    const state = JSON.stringify(payload);
    localStorage.setItem(WC_PROFILE_KEY, state);
    dispatch(actions.signIn(payload));
};

const signOut = (): AppThunk => (dispatch) => {
    localStorage.removeItem(WC_PROFILE_KEY);
    dispatch(actions.signOut());
};

const { actions, reducer } = profileSlice;
export const profileActions = {
    signIn,
    signOut,
};
export default reducer;
