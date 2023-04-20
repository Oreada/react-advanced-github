// import { useLazyGetUserReposQuery } from "../store/github/github.api";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setPageCurrent } from "../store/pagination.slice";


export function Pagination() {
	const { pageCurrent } = useAppSelector((state) => state.pagination);
	const { pageTotal } = useAppSelector((state) => state.pagination);
	const { username } = useAppSelector((state) => state.pagination);

	// const [fetchRepos, { data: repositories }] = useLazyGetUserReposQuery();

	const dispatch = useAppDispatch();

	const handleLeftArrowClick = () => {
		if (pageCurrent > 1) {
			const currentPageNew = pageCurrent - 1;
			dispatch(setPageCurrent(currentPageNew));

			// fetchRepos({ username: username, pageCurrent: currentPageNew });
		};
	};

	const handleRightArrowClick = () => {
		if (pageCurrent < pageTotal) {
			const currentPageNew = pageCurrent + 1;
			dispatch(setPageCurrent(currentPageNew));

			// fetchRepos({ username: username, pageCurrent: currentPageNew });
		};
	}

	return (
		<div className="flex flex-row justify-center items-center gap-6 pb-10">
			<i className="ri-arrow-left-fill cursor-pointer" onClick={handleLeftArrowClick}></i>
			<div className="flex flex-row justify-center items-center gap-2">
				<span className="">{pageCurrent}</span>
				<span className="">/</span>
				<span className="">{pageTotal}</span>
			</div>
			<i className="ri-arrow-right-fill cursor-pointer" onClick={handleRightArrowClick}></i>
		</div>
	)
}
