import { useAppSelector } from "../store/hook"

export function FavoritePage() {
	const favoritesList = useAppSelector((state) => state.github.favorites);

	if (favoritesList.length === 0) {
		return <p className="text-center">No favorite items</p>
	};

	return (
		<div className="pt-10 mx-auto h-full w-full flex justify-center">
			<ul className="list-none">
				{favoritesList.map((item) => (
					<li
						key={item}
					>
						<a href={item} target="_blank" rel="noreferrer">{item}</a>
					</li>
				))}
			</ul>
		</div>
	)
}
