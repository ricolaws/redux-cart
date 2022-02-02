import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart);

	return (
		<Card className={classes.cart}>
			<header>
				<h2>Your Shopping Cart</h2>
				<h3>${cartItems.grandTotal.toFixed(2)}</h3>
			</header>

			{!cartItems.totalQuantity && <p>Your cart is super empty!! ☹︎</p>}
			{cartItems.totalQuantity && (
				<ul>
					{cartItems.items.map((item) => (
						<CartItem
							key={item.id}
							item={{
								id: item.id,
								title: item.title,
								quantity: item.quantity,
								totalPrice: item.totalPrice,
								price: item.price,
							}}
						/>
					))}
				</ul>
			)}
		</Card>
	);
};

export default Cart;
