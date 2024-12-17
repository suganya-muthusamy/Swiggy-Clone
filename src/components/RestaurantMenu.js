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

	// console.log(categories);
	// console.log("filtered", filteredCategories);
	return (
		<div className="res-menu-container w-full md:w-8/12 m-auto px-4 xl:px-0">
			<div className="res-info py-4 border-b-2 flex justify-between items-center ">
				<div>
					<h1 className="font-bold text-2xl pb-2">
						{resInfo?.cards[0]?.card?.card?.info?.name}
					</h1>
					<h2 className="font-light pb-2">
						{resInfo?.cards[0]?.card?.card?.info?.cuisines.join(
							" | "
						)}
					</h2>
					<p className="pb-2">
						{resInfo?.cards[0]?.card?.card?.info?.areaName}
					</p>
				</div>
				<div className="border p-3 text-xs flex flex-col justify-center items-center">
					<p className="bg-orange-600 py-1 px-2 text-white w-max rounded-lg mb-2">
						*{resInfo?.cards[0]?.card?.card?.info?.avgRating}
					</p>
					<p className="py-2 border-t-2 text-xs">
						{
							resInfo?.cards[0]?.card?.card?.info
								?.totalRatingsString
						}
					</p>
				</div>
			</div>

			<ul>
				{filteredCategories?.map((category, index) => {
					return (
						<li key={category?.card?.card?.title}>
							<RestaurantCategory
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
