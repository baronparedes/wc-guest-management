import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '..';
import { Models } from '../../@types/models';
import { guestMetadataService } from '../../services/guest-metadata.service';
import { dashboardSlice } from './dashboard.reducer';

const initialState = {
    guestMetadata: [] as Models.GuestMetadata[],
    criteria: '',
    loading: false,
    error: '',
    date: new Date().getDate()
};

export const backroomSlice = createSlice({
    name: 'backroom',
    initialState,
    reducers: {
        getStarted: state => {
            state.loading = true;
            state.error = '';
        },
        getCompleted: (
            state,
            action: PayloadAction<Models.GuestMetadata[]>
        ) => {
            state.loading = false;
            state.error = '';
            state.guestMetadata = action.payload;
        },
        getFailed: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    extraReducers: {
        [dashboardSlice.actions.printCompleted.toString()]: (
            state,
            action: PayloadAction<Models.GuestInfo>
        ) => {
            if (state.guestMetadata) {
                const guestMetadata: Models.GuestMetadata = {
                    ...action.payload
                };
                state.guestMetadata.push(guestMetadata);
            }
        }
    }
});

const get = (
    criteria: string,
    targetDate: Date
): AppThunk => async dispatch => {
    try {
        dispatch(actions.getStarted());
        const data = await guestMetadataService.get(
            criteria,
            targetDate
        );
        dispatch(actions.getCompleted(data));
    } catch (err) {
        dispatch(actions.getFailed(err));
    }
};

const { actions, reducer } = backroomSlice;
export const backroomActions = {
    ...actions,
    get
};
export default reducer;
