import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: ["sugu", "anbu", "amma", "appa"],
	},
	reducers: {
		addItems: (state, action) => {
			// mutating the state directly here
			state.cartItems.push(action.payload);
		},
		removeItems: (state, action) => {
			state.cartItems.pop();
		},
		clearCart: (state, action) => {
			state.cartItems.length = 0;
		},
	},
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
