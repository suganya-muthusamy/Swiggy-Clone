import { MENU_ITEM_IMAGE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../reduxToolkit/cartSlice";

const MenuItems = ({ menuItems }) => {
	const cartItems = useSelector(store => store.cart.cartItems);

	const dispatch = useDispatch();

	const handleAddItems = item => {
		dispatch(addItems(item));
	};

	const handleRemoveItems = item => {
		dispatch(removeItems(item));
	};

	console.log("cartItems", cartItems);
	return (
		<div className="my-5">
			{menuItems?.map(item => {
				// to check if the item is already in the cart
				const isInCart = cartItems.find(
					cartItem => cartItem?.card?.info?.id == item?.card?.info?.id
				);

				return (
					<div className="flex justify-between border-b-2 last:border-b-0 py-2">
						<div key={item?.card?.info?.id} className="w-9/12 ">
							<h1 className="font-bold text-md">
								{item?.card?.info?.name}
							</h1>
							<h2 className="font-light text-sm">
								₹ {item?.card?.info?.price / 100}
							</h2>
							<p className="text-xs my-4 hidden sm:block">
								{item?.card?.info?.description}
							</p>
						</div>
						<div className="w-2/12 flex flex-col items-center relative">
							<img
								className="w-[118px] h-[78px] rounded-sm border object-cover"
								src={
									MENU_ITEM_IMAGE_URL +
									item?.card?.info?.imageId
								}
								alt={item?.card?.info?.name}
							/>
							{isInCart ? (
								<div className=" flex justify-between py-1 px-3 w-full max-w-[100px] -mt-4 bg-gray-800 rounded-md text-white text-bold cursor-pointer ">
									<span
										onClick={() => handleRemoveItems(item)}
										className="cursor-pointer">
										-
									</span>
									<span>{isInCart.quantity}</span>
									<span
										onClick={() =>
											handleAddItems({
												...item,
												quantity: 1,
											})
										}
										className="cursor-pointer">
										+
									</span>
								</div>
							) : (
								<button
									onClick={() =>
										handleAddItems({ ...item, quantity: 1 })
									}
									className="cursor-pointer p-1 w-full max-w-[100px] -mt-4 bg-gray-800 rounded-md text-white text-bold relative">
									Add
									<span className="absolute top-[-0.5rem] right-0 text-white p-0 sm:p-1">
										+
									</span>
								</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};
export default MenuItems;
