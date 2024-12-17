import RestaurantCard, { withOfferedData } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UseresData from "../utils/useRes";
import InfiniteScroll from "react-infinite-scroll-component";

const Body = () => {
	const [filteredRestaurant, setFilteredRestaurant] = useState(null);
	const [searchText, setSearchText] = useState("");

	const resdata = UseresData();

	useEffect(() => {
		setFilteredRestaurant(resdata);
	}, [resdata]);

	//higher order component
	const RestaurantCardOffered = withOfferedData(RestaurantCard);

	const onlineStatus = useOnlineStatus();
	if (onlineStatus == false) return <h1>You are offline</h1>;

	console.log("body", resdata);
	// console.log("body", resdata[0]?.info?.name);
	// console.log("body", resdata[0]?.info?.cuisine);

	return resdata === null || filteredRestaurant == null ? (
		<Shimmer />
	) : (
		<div className="body px-5 xl:w-[1280px] m-auto h-full py-10 xl:py-20">
			<div className="search-container flex flex-wrap items-center px-0 my-10">
				<input
					className="search-box border border-solid border-black p-2 rounded-tl-lg rounded-bl-lg"
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
				<button
					className="search-button border border-solid border-black px-4 py-2  border-l-0  rounded-tr-lg rounded-br-lg"
					type="submit"
					onClick={() => {
						setFilteredRestaurant(
							resdata?.filter(
								res =>
									res?.info?.name
										.toLowerCase()
										.includes(searchText.toLowerCase()) ||
									res?.info?.cuisines
										?.join(" ")
										.toLowerCase()
										.includes(searchText.toLowerCase()) ||
									res?.info?.locality
										.toLowerCase()
										.includes(searchText.toLowerCase())
							)
						);
						setSearchText("");
					}}>
					<i class="fa-solid fa-magnifying-glass"></i>
				</button>
				<button
					className="top-rated p-2 ml-0 mt-10 sm:mt-0 sm:ml-20 rounded-lg bg-green-600 text-white shadow"
					type="submit"
					onClick={() => {
						setFilteredRestaurant(
							resdata?.filter(res => res?.info?.avgRating > 4)
						);
					}}>
					Top Rated Restaurants
				</button>
			</div>

			{filteredRestaurant && (
				<div className="res-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
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
			)}
			{filteredRestaurant.length == 0 && (
				<div className="flex flex-col justify-center items-center h-full w-full py-10">
					<img
						alt="oops! no restaurant found"
						src="https://tse1.mm.bing.net/th?id=OIP.dCYjOfpMyYr1FXc04GN3GQHaDA&pid=Api&P=0&h=180"
					/>
					<a href="/">
						<button className="p-2 mt-10 rounded-lg bg-gray-200">
							Try Different Restaurants
						</button>
					</a>
				</div>
			)}
		</div>
	);
};

export default Body;
