import { useDispatch, useSelector } from "react-redux";
import MenuItems from "./MenuItems";
import { clearCart } from "../reduxToolkit/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
	const cartItems = useSelector(store => store.cart.cartItems);
	console.log(",,,,,,", cartItems);

	const dispatch = useDispatch();

	const handleClearCart = () => {
		dispatch(clearCart());
	};
	return (
		<div className="my-5">
			{cartItems?.length > 0 && (
				<span
					onClick={handleClearCart}
					className="bg-orange-600 text-white p-2 text-center m-auto flex justify-center w-fit rounded-md cursor-pointer">
					Clear Cart
				</span>
			)}
			<div className="w-full sm:w-8/12 md:w-6/12 m-auto px-4 xl:px-0 py-8">
				{cartItems?.length === 0 && (
					<div className="p-4 flex flex-col items-center justify-center">
						<img
							className="w-80 h-80 my-10"
							alt="the cart is empty"
							src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
						/>
						<h1>
							Your Cart is empty! Please add items to the cart!!
						</h1>
						<Link to="/">
							<span className="bg-orange-600 text-white p-2 my-6 text-center m-auto flex justify-center w-fit rounded-md cursor-pointer">
								Go to restaurants
							</span>
						</Link>
					</div>
				)}
				<MenuItems menuItems={cartItems} />
			</div>
		</div>
	);
};
export default Cart;
