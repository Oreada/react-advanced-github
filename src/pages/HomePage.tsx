import { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../customHooks/debounce";
import { useLazyGetUserInfoQuery, useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";
import { Pagination } from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setPageCurrent, setPageTotal, setUsername } from "../store/pagination.slice";
import { PER_PAGE_USER_REPOS } from "../constants";

const root = document.querySelector('#root');
(root as HTMLDivElement).style.height = '100%';
(root as HTMLDivElement).style.display = 'flex';
(root as HTMLDivElement).style.flexDirection = 'column';
document.body.style.height = '100%';
const html = document.querySelector('html');
(html as HTMLElement).style.height = '100%';

export function HomePage() {
	const { pageCurrent, pageTotal, username } = useAppSelector((state) => state.pagination);
	const [search, setSearch] = useState('');
	const [dropdown, setDropdown] = useState(false);
	const debounced = useDebounce(search);
	const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
		//! это условие необходимо, чтобы не выполнялся запрос с пустым search, в результате которого выскакивает ошибка
		skip: debounced.length < 3,
	});
	//! [функция-позволяющая-загружать-данные-по-запросу, {объект-как-в-обычном-хуке-запроса(как-в-useSearchUsersQuery-например)}]
	const [fetchRepos, { data: repositories, isLoading: areReposLoading }] = useLazyGetUserReposQuery();
	//! переименовали для этого вызова data в repositories, isLoading в areReposLoading, т.к. такие имена уже есть выше
	const [fetchUserInfo, { data: userInfo }] = useLazyGetUserInfoQuery();

	const dispatch = useAppDispatch();

	// console.log(data);

	useEffect(() => {
		// console.log(debounced);

		if (debounced.length > 2 && data?.length) {
			setDropdown(true);
		};
	}, [debounced, data]);

	useEffect(() => {
		console.log('без проверки наличия userInfo', userInfo);
		if (userInfo) {
			console.log(userInfo.public_repos);

			const userReposCount = userInfo.public_repos;
			const userPageTotal = Math.ceil(userReposCount / PER_PAGE_USER_REPOS);
			console.log(userPageTotal);

			dispatch(setPageTotal(userPageTotal));
		};
	}, [dispatch, userInfo]);

	useEffect(() => {
		if (username) {
			fetchRepos({ username, pageCurrent });
		};
	}, [pageCurrent, username]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleClick = (username: string) => {
		dispatch(setUsername(username));
		dispatch(setPageCurrent(1));
		// fetchRepos({ username, pageCurrent }); //*TODO: потестить (пока перенесла в useEffect)
		setDropdown(false);

		fetchUserInfo(username);
	};

	return (
		<div className="flex-auto pt-10 h-full w-full">
			{isError && <p className="text-center text-red-600 mb-10">Something went wrong!</p>}

			<div className="flex flex-col justify-center items-center gap-4 min-h-full">
				<div className="relative w-[480px] flex-auto flex flex-col gap-4">
					<input
						type="text"
						className="border rounded-sm py-2 px-4 w-full h-[42px]"
						placeholder="Search for GitHub username..."
						value={search}
						onChange={handleChange}
					/>

					{dropdown && <ul className="list-none overflow-y-scroll absolute z-10 top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white">
						{isLoading && <p className="text-center">Loading...</p>}

						{data?.map((user) => (
							<li
								key={user.id}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
								onClick={() => handleClick(user.login)}
							>
								{user.login}
							</li>
						))}
					</ul>}

					<div className="container flex flex-col justify-center gap-2">
						{areReposLoading && <p className="text-center">Repos are loading...</p>}

						{userInfo?.public_repos === 0 && <p className="text-center">User does not have public repositories</p>}

						{repositories?.map((repo) => (
							<RepoCard key={repo.id} repo={repo} />
						))}
					</div>
				</div>

				<Pagination />
			</div>
		</div>
	)
}
