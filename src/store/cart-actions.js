import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// thunk-zone
export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://redux-cart-bae3d-default-rtdb.firebaseio.com/cart.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch cart data.");
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
					grandTotal: cartData.grandTotal,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Cart fetch failed.",
				})
			);
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Updating cart.",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://redux-cart-bae3d-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
						grandTotal: cart.grandTotal,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Cart update failure.");
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Cart updated successfully!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Cart updated failed.",
				})
			);
		}
	};
};
