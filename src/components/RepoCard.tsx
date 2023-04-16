import { useState } from "react";
import { RepoCardProps } from "../models/models";
import { addFavorite, removeFavorite } from "../store/github/github.slice";
import { useAppDispatch, useAppSelector } from "../store/hook";

export function RepoCard({ repo }: RepoCardProps) {
	const favoritesList = useAppSelector((state) => state.github.favorites);
	const dispatch = useAppDispatch();

	const [isFavorite, setIsFavorite] = useState(favoritesList.includes(repo.html_url));

	const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch(addFavorite(repo.html_url));
		setIsFavorite(true);
	};

	const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch(removeFavorite(repo.html_url));
		setIsFavorite(false);
	};

	return (
		<div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
			<a href={repo.html_url} target="_blank" rel="noreferrer">
				<h2 className="text-large font-bold">{repo.full_name}</h2>
				<p className="text-sm">
					Forks: <span className="font-bold mr-2">{repo.forks}</span>
					Watchers: <span className="font-bold">{repo.watchers}</span>
				</p>
				<p className="text-sm font-thin">
					{repo?.description}
				</p>
				{!isFavorite && <button
					className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
					onClick={addToFavorite}
				>
					Add
				</button>}
				{isFavorite && <button
					className="py-2 px-4 bg-green-400 rounded hover:shadow-md transition-all"
					onClick={removeFromFavorite}
				>
					Remove
				</button>}
			</a>
		</div>
	)
}
