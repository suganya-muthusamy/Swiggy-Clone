import { useState } from "react";
import MenuItems from "./MenuItems";
const RestaurantCategory = ({ data, showIndex, setShowIndex, isActive }) => {
	const handleClick = () => {
		setShowIndex();
	};
	return (
		<div className="py-4 border-b-8">
			<div
				className="flex justify-between font-bold text-xl cursor-pointer"
				onClick={handleClick}>
				<span>
					{data.title}({data.itemCards.length})
				</span>
				<span>{isActive ? "∧" : "∨"}</span>
			</div>
			<div>{isActive && <MenuItems menuItems={data.itemCards} />}</div>
		</div>
	);
};
export default RestaurantCategory;
