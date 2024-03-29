import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRepo, IUser, IUserInfo, ServerResponse } from '../../models/models';
import { PER_PAGE_SEARCH_USERS, PER_PAGE_USER_REPOS } from '../../constants';

export const githubApi = createApi({
	reducerPath: 'github/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com/'
	}),
	endpoints: (build) => ({
		//! <что-получаем-в-ответ-от-сервера, какой-параметр-принимаем-чтобы-осуществить-данный-запрос>
		//! получаю IUser[], а не ServerResponse, т.к. сделала ниже трансформацию респонса - см. transformResponse
		searchUsers: build.query<IUser[], string>({
			//! (search: string) - это как раз и есть "какой-параметр-принимаем-чтобы-осуществить-данный-запрос"
			query: (search: string) => ({
				url: `search/users`,
				params: {
					q: search,
					per_page: PER_PAGE_SEARCH_USERS,
				}
			}),
			//! потому что мне нужно только поле items в данном случае, а вообще ключ transformResponse не является обязательным
			transformResponse: (response: ServerResponse) => response.items,
		}),
		getUserRepos: build.query<IRepo[], { username: string, pageCurrent: number }>({
			query: ({ username, pageCurrent }) => ({
				url: `users/${username}/repos`,
				params: {
					per_page: PER_PAGE_USER_REPOS,
					page: pageCurrent,
				}
			}),
		}),
		getUserInfo: build.query<IUserInfo, string>({
			query: (username: string) => ({
				url: `users/${username}`,
			}),
		}),
	})
});

//! префикс Lazy позволяет сделать запрос когда захотим, ведь нам нужно делать запрос после клика по опред.пользователю
export const { useSearchUsersQuery, useLazyGetUserReposQuery, useLazyGetUserInfoQuery } = githubApi;
