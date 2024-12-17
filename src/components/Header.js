import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
	const [logBtn, setLogBtn] = useState("Login");
	const [headerMenu, setHeaderMenu] = useState(false);

	const onlineStatus = useOnlineStatus();

	const user = useContext(UserContext);

	// subscribing to the store using the selector
	const cartItems = useSelector(store => store.cart.cartItems);

	const handleHeaderMenu = () => {
		setHeaderMenu(!headerMenu);
	};

	return (
		<div className="header px-5 bg-gray-50 shadow-md">
			<div className="xl:w-[1280px] m-auto py-2 flex justify-between items-center">
				<div className="logo-container">
					<h1 className="text-5xl font-bold text-orange-600 ">
						sauter
					</h1>
					<h1 className="text-lg text-orange-600">The Dishes</h1>
				</div>
				<div className="nav-items">
					<h1 onClick={handleHeaderMenu} className="md:hidden">
						<i class="fa-solid fa-bars"></i>
					</h1>
					{headerMenu && (
						<ul className="flex flex-col md:hidden font-semibold absolute top-0 left-0 z-10 bg-gray-50 shadow-md p-5 w-[300px]">
							<li
								onClick={handleHeaderMenu}
								className="text-right">
								<i class="fa-solid fa-xmark"></i>
							</li>
							<li className="mr-6 lg:mr-10 text-orange-600">
								Online Status :
								{onlineStatus ? (
									<span className="ml-2">🟢</span>
								) : (
									<span className="ml-2">🔴</span>
								)}
							</li>
							<li className="mr-6 my-2 hover:text-orange-600">
								<Link to="/">Home</Link>
							</li>

							<li className="mr-6 my-2 hover:text-orange-600">
								<div className="relative">
									<Link to="/cart">Cart</Link>
									<span className=" rounded-full absolute bottom-2 px-2 bg-orange-600 text-white">
										{cartItems.reduce(
											(total, item) =>
												total + item.quantity,
											0
										)}
									</span>
								</div>
							</li>
							<li className="mr-6 my-2 hover:text-orange-600">
								<Link to="/login">
									<button
										onClick={e => {
											e.preventDefault();
											logBtn === "Login"
												? setLogBtn("Logout")
												: setLogBtn("Login");
										}}>
										{logBtn}
									</button>
								</Link>
							</li>
							<li>{user.name}</li>
						</ul>
					)}
					<ul className=" hidden md:flex md:flex-row items-center font-semibold">
						<li className="mr-6 lg:mr-10 text-orange-600">
							Online Status :
							{onlineStatus ? (
								<span className="ml-2">🟢</span>
							) : (
								<span className="ml-2">🔴</span>
							)}
						</li>
						<li className="mr-6 lg:mr-10 hover:text-orange-600">
							<Link to="/">Home</Link>
						</li>

						<li className="mr-6 lg:mr-10 hover:text-orange-600">
							<div className="relative">
								<Link to="/cart">Cart</Link>
								<span className=" rounded-full absolute bottom-2 px-2 bg-orange-600 text-white">
									{cartItems.reduce(
										(total, item) => total + item.quantity,
										0
									)}
								</span>
							</div>
						</li>
						<li className="mr-6 lg:mr-10 hover:text-orange-600">
							<Link to="/login">
								<button
									onClick={e => {
										e.preventDefault();
										logBtn === "Login"
											? setLogBtn("Logout")
											: setLogBtn("Login");
									}}>
									{logBtn}
								</button>
							</Link>
						</li>
						<li>{user.name}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
