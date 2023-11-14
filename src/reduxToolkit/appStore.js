import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

//appstore will conatin a big reducer, which includes small reducers
const appStore = configureStore({
	reducer: {
		cart: cartReducer,
		// user: userReducer,  we can add multiple slices
	},
});

export default appStore;
