import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_FAV_KEY = 'reactGithubFavorite';

export type GithubState = {
	favorites: string[];
};

const initialState: GithubState = {
	favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

const githubSlice = createSlice({
	name: 'github',
	initialState: initialState,
	reducers: {
		addFavorite(state, action: PayloadAction<string>) {
			state.favorites.push(action.payload);
			localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
		},
		removeFavorite(state, action: PayloadAction<string>) {
			state.favorites = state.favorites.filter((item) => item !== action.payload);
			localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
		},
	},
});

export const { addFavorite, removeFavorite } = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
