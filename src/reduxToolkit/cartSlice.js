import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
	},

	reducers: {
		addItems: (state, action) => {
			console.log("payload", action.payload);
			// Check if the item already exists in the cart
			const itemExists = state.cartItems
				.map(item => item?.card?.info?.id)
				.includes(action.payload?.card?.info?.id);

			if (itemExists) {
				const existingItem = state.cartItems.find(
					item =>
						item?.card?.info?.id === action.payload?.card?.info?.id
				);
				existingItem.quantity += 1;
			} else {
				state.cartItems.push({ ...action.payload, quantity: 1 });
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		removeItems: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				item => item?.card?.info?.id === action.payload?.card?.info?.id
			);

			if (itemIndex !== -1) {
				if (state.cartItems[itemIndex].quantity > 1) {
					state.cartItems[itemIndex].quantity -= 1;
				} else {
					state.cartItems.splice(itemIndex, 1);
				}
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		clearCart: (state, action) => {
			state.cartItems = [];
		},
	},
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
