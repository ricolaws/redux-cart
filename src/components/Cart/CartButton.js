import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const totalItems = useSelector((state) => state.cart.totalQuantity);

	const toggleCartHandler = () => {
		dispatch(uiActions.toggleCart());
	};

	return (
		<button onClick={toggleCartHandler} className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalItems}</span>
		</button>
	);
};

export default CartButton;
