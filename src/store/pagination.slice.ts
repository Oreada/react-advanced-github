import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PaginationState = {
	pageCurrent: number;
	pageTotal: number;

	username: string;
}

const initialState: PaginationState = {
	pageCurrent: 1,
	pageTotal: 1,

	username: '',
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState: initialState,
	reducers: {
		setPageCurrent(state, action: PayloadAction<number>) {
			state.pageCurrent = action.payload;
		},
		setPageTotal(state, action: PayloadAction<number>) {
			state.pageTotal = action.payload;
		},
		setUsername(state, action: PayloadAction<string>) {
			state.username = action.payload;
		},
	}
});

export const { setPageCurrent, setPageTotal, setUsername } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
