import { useState, useEffect } from "react";
import { MENU_API_URL } from "./constants";

const useRestaurantMenu = resId => {
	const [resInfo, setResInfo] = useState(null);

	// let array = [2, 3, 1, 3];
	// let ans = array.filter(arr => arr !== 2);
	// console.log(ans);

	useEffect(() => {
		fetchMenu();
	}, []);

	const fetchMenu = async () => {
		const data = await fetch(MENU_API_URL + resId);
		const json = await data.json();
		setResInfo(json.data);
		console.log("MENU......", json);
	};

	return resInfo;
};
export default useRestaurantMenu;
