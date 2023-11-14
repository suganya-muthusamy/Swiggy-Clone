import { MENU_ITEM_IMAGE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItems } from "../reduxToolkit/cartSlice";

const MenuItems = ({ menuItems, cartItems }) => {
	const dispatch = useDispatch();

	const handleAddItems = () => {
		dispatch(addItems("suganya"));
	};
	return (
		<div className="my-5">
			{menuItems.map(item => {
				return (
					<div className="flex justify-between border-b-2 last:border-b-0 py-2">
						<div key={item?.card?.info?.id} className="w-9/12 ">
							<h1 className="font-bold text-md">
								{item?.card?.info?.name}
							</h1>
							<h2 className="font-light text-sm">
								₹ {item?.card?.info?.price / 100}
							</h2>
							<p className="text-xs my-4">
								{item?.card?.info?.description}
							</p>
						</div>
						<div className="w-2/12 flex items-center relative">
							<img
								className="w-[118px] h-[78px] rounded-sm border"
								src={
									MENU_ITEM_IMAGE_URL +
									item?.card?.info?.imageId
								}
								alt={item?.card?.info?.name}
							/>
							<button
								onClick={handleAddItems}
								className="absolute mx-auto left-0 bottom-0 right-0 bg-white rounded-md text-green-600 text-bold w-11/12 md:w-8/12 xl:w-6/12">
								Add
								<span className="absolute top-[-0.5rem] right-0">
									+
								</span>
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default MenuItems;
