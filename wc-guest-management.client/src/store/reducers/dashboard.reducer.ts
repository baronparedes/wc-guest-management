import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '..';
import { Models } from '../../@types/models';
import { guestService } from '../../services/guest.service';

const initialState = {
    loading: false,
    error: '',
    guests: [] as Models.GuestInfo[]
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        getStarted: state => {
            state.loading = true;
            state.error = '';
        },
        getCompleted: (
            state,
            action: PayloadAction<Models.GuestInfo[]>
        ) => {
            state.loading = false;
            state.error = '';
            state.guests = action.payload;
        },
        getFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        printQueued: (
            state,
            action: PayloadAction<{
                id: number;
                status: Models.PrintStatus;
            }>
        ) => {
            const info = state.guests.find(
                _ => _.id === action.payload.id
            );
            if (info) {
                info.status = action.payload.status;
            }
        },
        printCompleted: (
            state,
            action: PayloadAction<Models.GuestInfo>
        ) => {
            state.guests = state.guests.filter(
                _ => _.id !== action.payload.id
            );
            return state;
        },
        queuedGuestsCompleted: (
            state,
            action: PayloadAction<Models.GuestInfo[]>
        ) => {
            if (state.guests) {
                state.guests = state.guests.concat(action.payload);
            }
        }
    }
});

const get = (): AppThunk => async dispatch => {
    try {
        dispatch(actions.getStarted());
        const data = await guestService.get();
        dispatch(actions.getCompleted(data));
        dispatch(print(data[0])); //TODO REMOVE THIS
    } catch (err) {
        dispatch(actions.getFailed(err));
    }
};

const print = (info: Models.GuestInfo): AppThunk => async dispatch => {
    dispatch(actions.printQueued({ id: info.id, status: 'printing' }));
    const result = await guestService.print(info.id);
    if (result) {
        dispatch(actions.printCompleted(info));
    } else {
        dispatch(actions.printQueued({ id: info.id, status: '' }));
    }
};

const queueGuests = (
    info: Models.InfoSlip,
    onSuccess?: (guests: Models.GuestInfo[]) => void
): AppThunk => async dispatch => {
    const data = await guestService.addGuest(info);
    if (data) {
        dispatch(actions.queuedGuestsCompleted(data));
        onSuccess && onSuccess(data);
    }
};

const { actions, reducer } = dashboardSlice;
export const dashboardActions = {
    // ...actions,
    get,
    print,
    queueGuests: queueGuests
};
export default reducer;
