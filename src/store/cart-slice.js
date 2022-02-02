import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState,
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					title: newItem.title,
					totalPrice: newItem.price,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
			state.totalQuantity++;
		},
		removeItem(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem.quantity > 1) {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			} else {
				state.items = state.items.filter((item) => item.id !== id);
			}
			state.totalQuantity--;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
