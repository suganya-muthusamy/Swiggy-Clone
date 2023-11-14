import { useState, useEffect } from "react";
import { RES_DATA_URL } from "./constants";

const UseresData = () => {
	const [resdata, setresData] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const data = await fetch(RES_DATA_URL);
		const json = await data.json();

		//optional chaining
		const JSON_DATA = await json?.data?.cards[5]?.card?.card?.gridElements
			?.infoWithStyle?.restaurants;
		setresData(JSON_DATA);
		console.log("actual data", json);
	};
	console.log("fetchData", resdata);
	return resdata;
};

export default UseresData;
