import RestaurantCard, { withOfferedData } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UseresData from "../utils/useRes";
import UserContext from "../utils/UserContext";

const Body = () => {
	const [filteredRestaurant, setFilteredRestaurant] = useState(null);
	const [searchText, setSearchText] = useState("");

	const { name, setUserName } = useContext(UserContext);

	const resdata = UseresData();

	useEffect(() => {
		setFilteredRestaurant(resdata);
	}, [resdata]);

	//higher order component
	const RestaurantCardOffered = withOfferedData(RestaurantCard);

	const onlineStatus = useOnlineStatus();
	if (onlineStatus == false) return <h1>You are offline</h1>;

	console.log("body", resdata);
	return resdata === null || filteredRestaurant == null ? (
		<Shimmer />
	) : (
		<div className="body xl:w-[1280px] m-auto">
			<div className="search-container px-5 my-10">
				<input
					className="search-box border border-solid border-black pl-2"
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
				<button
					className="search-button border border-solid border-black"
					type="submit"
					onClick={() => {
						setFilteredRestaurant(
							resdata?.filter(res =>
								res?.info?.name
									.toLowerCase()
									.includes(searchText.toLowerCase())
							)
						);
					}}>
					Search
				</button>
				<button
					className="top-rated px-2 ml-20 bg-green-600 text-white shadow"
					type="submit"
					onClick={() => {
						setFilteredRestaurant(
							resdata?.filter(res => res?.info?.avgRating > 4)
						);
					}}>
					Top Rated Restaurants
				</button>

				<label>name : </label>
				{/* <input
					className="p-2 border"
					value={name}
					onChange={e => {
						setUserName(e.target.value);
					}}
				/> */}
			</div>
			<div className="res-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{filteredRestaurant?.map(restaurant => (
					<Link
						key={restaurant?.info?.id}
						to={"/restaurants/" + restaurant?.info?.id}>
						{restaurant?.info?.aggregatedDiscountInfoV3 ? (
							<RestaurantCardOffered resData={restaurant} />
						) : (
							<RestaurantCard resData={restaurant} />
						)}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Body;
