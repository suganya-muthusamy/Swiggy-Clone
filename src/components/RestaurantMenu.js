import { MENU_ITEM_IMAGE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";

const RestaurantMenu = () => {
	const { resId } = useParams();
	const resInfo = useRestaurantMenu(resId);
	const [showIndex, setShowIndex] = useState(null);

	if (resInfo == null) return <Shimmer />;

	const categories =
		resInfo?.cards?.length == 3
			? resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
			: resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

	const filteredCategories = categories?.filter(c => {
		return (
			c.card?.card?.["@type"] ===
			"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
		);
	});

	console.log(categories);
	console.log("filtered", filteredCategories);
	return (
		<div className="res-menu-container w-full sm:w-8/12 md:w-6/12 m-auto px-4 xl:px-0">
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
						<li>
							<RestaurantCategory
								key={category?.card?.card?.title}
								data={category?.card?.card}
								showItems={index === showIndex ? true : false}
								setShowItems={() => {
									setShowIndex(index);
								}}
							/>
						</li>
					);
				})}
			</ul>
			{/* <div className="res-menu">
				<h1 className="text-2xl font-bold py-3">
					{
						resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
							?.cards[1]?.card?.card?.title
					}
					<span className="pl-2">
						(
						{
							resInfo?.cards[2]?.groupedCard?.cardGroupMap
								?.REGULAR?.cards?.length
						}
						)
					</span>
				</h1>
				<ul>
					{itemCards?.map(item => (
						<li
							className="menu-info py-5 border-b-2"
							key={item?.card?.info?.id}>
							<div className="flex justify-between">
								<div className="w-9/12">
									<h2>{item?.card?.info?.name}</h2>
									<p>{item?.card?.info?.description}</p>
									<span>
										Rs. {item?.card?.info?.price / 100}
									</span>
								</div>
								<img
									className="w-1/12"
									src={
										MENU_ITEM_IMAGE_URL +
										item?.card?.info?.imageId
									}
								/>
							</div>
						</li>
					))}
				</ul>
			</div> */}
		</div>
	);
};

export default RestaurantMenu;
