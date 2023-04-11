import { useEffect, useState } from "react";
import { useDebounce } from "../customHooks/debounce";
import { useSearchUsersQuery } from "../store/github/github.api"

export function HomePage() {
	const [search, setSearch] = useState('');
	const [dropdown, setDropdown] = useState(false);
	const debounced = useDebounce(search);
	const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
		//! это условие необходимо, чтобы не выполнялся запрос с пустым search, в результате которого выскакивает ошибка
		skip: debounced.length < 3,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	// console.log(data);

	useEffect(() => {
		console.log(debounced);

		if (debounced.length > 2 && data?.length) {
			setDropdown(true);
		};
	}, [debounced, data]);

	return (
		<div>
			{isError && <p className="text-center text-red-600 mt-10">Something went wrong</p>}
			<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
				<div className="relative w-[560px]">
					<input
						type="text"
						className="border py-2 px-4 w-full h-[42px] mb-2"
						placeholder="Search for GitHub username..."
						value={search}
						onChange={handleChange}
					/>

					{dropdown && <ul className="list-none overflow-y-scroll absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white">
						{isLoading && <p className="text-center">Loading...</p>}
						{data?.map((user) => (
							<li
								key={user.id}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
							>
								{user.login}
							</li>
						))}
					</ul>}
				</div>
			</div>
		</div>
	)
}
