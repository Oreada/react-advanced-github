import { removeFavorite } from "../store/github/github.slice";
import { useAppDispatch } from "../store/hook";

export interface FavoriteCardProps {
	repoLink: string;
}

export function FavoriteCard({ repoLink }: FavoriteCardProps) {
	const dispatch = useAppDispatch();

	const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch(removeFavorite(repoLink));
	};

	return (
		<div className="flex justify-between items-center gap-6">
			<a href={repoLink} target="_blank" rel="noreferrer" className="hover:underline">{repoLink}</a>
			<i className="ri-delete-bin-2-line cursor-pointer hover:opacity-70 transition-all" onClick={removeFromFavorite}></i>
		</div>
	)
}
