import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
	items: [],
	totalQuantity: 0,
	grandTotal: 0,
	changed: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState,
	reducers: {
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.totalQuantity = action.payload.totalQuantity;
			state.grandTotal = action.payload.grandTotal;
		},
		addItem(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			state.grandTotal += newItem.price;
			state.changed = true;
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
		},
		removeItem(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			state.grandTotal -= existingItem.price;
			state.changed = true;
			if (existingItem.quantity > 1) {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			} else {
				state.items = state.items.filter((item) => item.id !== id);
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
