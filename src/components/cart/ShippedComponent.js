import { axiosInstance } from "@/pages/api/axiosInstance";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";

const ShippedComponent = ({ cart }) => {
	const [cartTotal, setCartTotal] = useState(0);
	const [isLoading, setIsloading] = useState(true);
	// cart total
	useEffect(() => {
		setIsloading(true);
		let total = 0;
		if (cart) {
			cart.cartItemsId.map((itemId) => {
				axiosInstance
					.get(`/cartitems/${itemId}`)
					.then((response) => {
						const cartItem = response.data;
						if (cartItem) {
							axiosInstance
								.get(`/products/${cartItem.productItemId}`)
								.then((response) => {
									const productItem = response.data;
									if (productItem) {
										total += cartItem.quantity * productItem.price;
										setCartTotal(total);
									}
								})
								.catch((err) => console.log(err));

							setIsloading(false);
						}
					})
					.catch((err) => console.log(err));
			});
		} else {
			setIsloading(false);
		}
	}, [cart]);
	const renderCart = () => {
		return (
			<>
				<div>Date: {new Date(cart.updatedAt).toString()}</div>
				<hr className="max-w-sm" />
				<div>Total: ₱{cartTotal}</div>
			</>
		);
	};
	return (
		<div className="grid gap-2 xs:grid-flow-row bg-primary/75 p-5 text-white">
			{isLoading ? <Spinner /> : renderCart()}
		</div>
	);
};

export default ShippedComponent;
