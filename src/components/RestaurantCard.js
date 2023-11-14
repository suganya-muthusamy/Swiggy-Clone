import { CDN_URL } from "./../utils/constants";

const RestaurantCard = ({ resData }) => {
	const veg = {
		bg: "bg-green-600",
	};
	const nonVeg = {
		bg: "bg-red-600",
	};

	return (
		<div className=" restaurant-card mx-5 mb-5">
			<div className="relative">
				<img
					className="restaurant-img rounded-2xl"
					src={CDN_URL + resData?.info?.cloudinaryImageId}
					alt="restaurant-img"
				/>
				<div className="absolute bottom-0 h-[70px] w-full bg-gradient-to-t from-black rounded-b-2xl"></div>
			</div>
			<div className="restaurant-info p-3">
				<h1 className="mb-2 font-bold text-lg">
					{resData?.info?.name}
				</h1>
				<h3 className="mb-2 font-light h-6 overflow-hidden hover:h-max">
					{resData?.info?.cuisines.join(" | ")}
				</h3>
				<h4 className="rating bg-orange-600 text-gray-200 py-1 px-2 mb-2 w-10 flex justify-center items-center rounded-md ">
					*{resData?.info?.avgRating}
				</h4>
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
				<div className="mx-5 w-fit absolute top-0 left-0 m-auto translate-y-32">
					<span className="font-bold text-2xl pl-2 text-white">
						{props?.resData?.info?.aggregatedDiscountInfoV3?.header}
					</span>
					<span className="font-bold text-2xl pl-2 text-white">
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
