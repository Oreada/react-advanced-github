import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LS_TOTALPAGE_KEY, LS_USERNAME_KEY } from "../constants";

type PaginationState = {
	pageCurrent: number;
	pageTotal: number;

	username: string;
}

const initialState: PaginationState = {
	pageCurrent: 1,
	pageTotal: Number(localStorage.getItem(LS_TOTALPAGE_KEY)) !== 0 ? Number(localStorage.getItem(LS_TOTALPAGE_KEY)) : 1,

	username: localStorage.getItem(LS_USERNAME_KEY) ?? '',
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
			localStorage.setItem(LS_TOTALPAGE_KEY, String(state.pageTotal));
		},
		setUsername(state, action: PayloadAction<string>) {
			state.username = action.payload;
			localStorage.setItem(LS_USERNAME_KEY, state.username);
		},
	}
});

export const { setPageCurrent, setPageTotal, setUsername } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
