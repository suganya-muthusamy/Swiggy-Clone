import { MENU_ITEM_IMAGE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";

const RestaurantMenu = () => {
	const { resId } = useParams();
	const resInfo = useRestaurantMenu(resId);
	const [showIndex, setShowIndex] = useState(0);

	if (resInfo == null) return <Shimmer />;

	console.log("resInfo", resInfo);

	const categories =
		resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
	console.log("categories", categories);

	const filteredCategories = categories?.filter(c => {
		return (
			c.card?.card?.["@type"] ===
			"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
		);
	});

	// to get title
	const title = resInfo?.cards[0]?.card?.card?.text;

	// to get few details
	const details = resInfo?.cards[2]?.card?.card?.info;
	console.log("details", details);

	return (
		<div className="res-menu-container w-full md:w-8/12 m-auto px-4 xl:px-0">
			<div className="res-info py-4  flex justify-between items-center ">
				<h1 className="text-xl font-bold">{title}</h1>
			</div>

			<div className="my-6 border p-4 rounded-2xl shadow-lg ">
				<p className="font-bold ">
					<i class="fa-solid fa-star text-xs text-white rounded-full p-1 bg-green-700 mr-2"></i>
					<span className="mr-1">{details?.avgRating}</span>(
					{details.totalRatingsString}) .
					<span className="mx-2">{details?.costForTwoMessage}</span>
				</p>
				<div className="cuisines my-2 text-orange-600 font-bold underline">
					{details?.cuisines?.join(", ")}
				</div>
				<div>
					<p className="my-2">
						<span className="font-bold">Outlet -</span>{" "}
						{details?.locality}
					</p>
					<p className="font-bold my-2 text-sm">
						{details?.sla?.slaString}
					</p>
				</div>
			</div>

			<ul>
				{filteredCategories?.map((category, index) => {
					return (
						<li key={category?.card?.card?.title}>
							<RestaurantCategory
								allCategories={categories}
								data={category?.card?.card}
								isActive={index === showIndex}
								setShowIndex={() => {
									setShowIndex(
										index === showIndex ? null : index
									);
								}}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default RestaurantMenu;
