import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

//! githubApi.reducer, githubApi.middleware - не создавались вручную, из создаёт сам RTKQuery

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
