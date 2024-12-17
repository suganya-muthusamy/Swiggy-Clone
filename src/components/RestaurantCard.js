import { CDN_URL } from "./../utils/constants";

const RestaurantCard = ({ resData }) => {
	const veg = {
		bg: "bg-green-600",
	};
	const nonVeg = {
		bg: "bg-red-600",
	};
	console.log("resData", resData);
	return (
		<div className=" restaurant-card">
			<div className="relative">
				<img
					className="restaurant-img rounded-2xl w-full h-48 object-cover"
					src={CDN_URL + resData?.info?.cloudinaryImageId}
					alt={resData?.info?.name}
				/>
				<div className="absolute bottom-0 h-[70px] w-full bg-gradient-to-t from-black rounded-b-2xl"></div>
			</div>
			<div className="restaurant-info p-3">
				<h1 className=" font-bold text-lg">{resData?.info?.name}</h1>
				<h4 className="rating font-bold flex items-center">
					<i class="fa-solid fa-star text-xs text-white rounded-full p-1 bg-green-700 mr-2"></i>
					{resData?.info?.avgRating}
					<i class="fa-brands fa-creative-commons-zero px-2 text-xs"></i>
					{resData?.info?.sla.slaString}
				</h4>

				<h3 className=" h-6 overflow-hidden">
					{resData?.info?.cuisines.join(", ")} ...
				</h3>
				<h1 className="mb-2">{resData?.info?.locality}</h1>

				{/* <h5 className={resData.info.veg ? veg.bg : nonVeg.bg}>
					{resData.info.veg ? "veg " : "non-veg "}
				</h5> */}
			</div>
		</div>
	);
};

// higher order
export const withOfferedData = RestaurantCard => {
	return props => {
		return (
			<div className="relative">
				<RestaurantCard {...props} />
				<div className="mx-1 w-fit absolute top-0 left-0 m-auto translate-y-36">
					<span className="font-bold text-xl pl-2 text-white">
						{props?.resData?.info?.aggregatedDiscountInfoV3?.header}
					</span>
					<span className="font-bold text-xl pl-2 text-white">
						{
							props?.resData?.info?.aggregatedDiscountInfoV3
								?.subHeader
						}
					</span>
				</div>
			</div>
		);
	};
};

export default RestaurantCard;
