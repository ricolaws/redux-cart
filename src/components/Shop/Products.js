import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS_ARR = [
	{
		id: "p1",
		price: 6,
		title: "alligator-taste",
		description: "Crispy, elegant, timeless design. - I'm Amazed!",
	},
	{
		id: "p2",
		price: 9,
		title: "koala-taste",
		description: "Cool white-grape puffy",
	},
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{PRODUCTS_ARR.map((p) => {
					return (
						<ProductItem
							key={p.id}
							id={p.id}
							title={p.title}
							price={p.price}
							description={p.description}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Products;
