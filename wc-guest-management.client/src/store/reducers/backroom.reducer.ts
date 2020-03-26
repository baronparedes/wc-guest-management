import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentDateFormatted } from '../../@utils/dates';
import { FetchGuestsQueryParams, Guest } from '../../Api';

const initialState = {
    guestMetadata: [] as Guest[] | null,
    query: {
        byVisitDate: getCurrentDateFormatted()
    } as FetchGuestsQueryParams
};

export const backroomSlice = createSlice({
    name: 'backroom',
    initialState,
    reducers: {
        refreshQueue: (
            state,
            action: PayloadAction<Guest[] | null>
        ) => {
            state.guestMetadata = action.payload;
        },
        query: (
            state,
            action: PayloadAction<FetchGuestsQueryParams>
        ) => {
            state.query = action.payload;
            state.guestMetadata = null;
        }
    }
});

const { actions, reducer } = backroomSlice;
export const backroomActions = {
    ...actions
};
export default reducer;
