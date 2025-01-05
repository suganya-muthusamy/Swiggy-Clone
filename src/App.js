import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
// import Cart from "./components/Cart";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RestaurantCard from "./components/RestaurantCard";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./reduxToolkit/appStore";

const Cart = lazy(() => import("./components/Cart"));

const AppLayout = () => {
	const onlineStatus = useOnlineStatus();

	const [userName, setUserName] = useState();
	useEffect(() => {
		setUserName("Suganya M");
	}, []);

	if (onlineStatus === false)
		return (
			<>
				<Header />
				<h1>you are offline!!</h1>
			</>
		);

	return (
		<Provider store={appStore}>
			<UserContext.Provider value={{ name: userName, setUserName }}>
				<Header />
				<Outlet />
				<Footer />
			</UserContext.Provider>
		</Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ path: "/", element: <Body /> },
			{
				path: "/cart",
				element: (
					// lazy loading to improve performance
					<Suspense fallback={<h1>loading....</h1>}>
						<Cart />
					</Suspense>
				),
			},
			{ path: "/restaurants/:resId", element: <RestaurantMenu /> },
		],

		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />);

root.render(<RouterProvider router={appRouter} />);
