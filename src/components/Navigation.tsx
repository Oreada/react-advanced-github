import { NavLink } from "react-router-dom";

export function Navigation() {
	return (
		<nav className="flex justify-between items-center min-h-[50px] px-5 shadow-md bg-gray-500 text-white">
			<h3 className="font-bold">GitHub Search</h3>
			<span>
				<NavLink to='/' end
					className={({ isActive }) => (isActive ? 'bg-white rounded-sm text-gray-500 mr-2 p-1' : 'mr-2 p-1')}
				>
					Home
				</NavLink>
				<NavLink to='/favorite'
					className={({ isActive }) => (isActive ? 'bg-white rounded-sm text-gray-500 mr-2 p-1' : 'mr-2 p-1')}
				>
					Favorite
				</NavLink>
			</span>
		</nav>
	);
}
