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
		<div className="border py-3 px-5 rounded-sm hover:shadow-md hover:bg-gray-100 transition-all">
			<a href={repo.html_url} target="_blank" rel="noreferrer" className="relative">
				<h2 className="text-large font-bold pr-6">{repo.full_name}</h2>
				<div className="text-sm font-thin pr-6">
					{repo?.description}
				</div>
				<div className="text-sm">
					Forks: <span className="font-bold mr-2">{repo.forks}</span>
					{repo.language ? <div>Language:&nbsp;<span className="font-bold">{repo.language}</span></div> : null}
				</div>
				{!isFavorite &&
					<i className="ri-heart-add-line absolute top-0 right-0 cursor-pointer hover:opacity-70 transition-all"
						onClick={addToFavorite}></i>
				}
				{isFavorite &&
					<i className="ri-heart-fill absolute top-0 right-0 cursor-pointer hover:opacity-70 transition-all"
						onClick={removeFromFavorite}></i>
				}
			</a>
		</div>
	)
}
