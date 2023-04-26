import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../api/axiosInstance";
import { useRouter } from "next/router";
import Spinner from "@/components/loader/Spinner";
import ShippedComponent from "@/components/cart/ShippedComponent";

const ShippedCart = () => {
	const signinStore = useSelector((state) => state.signinStore);
	const [shippedCarts, setShippedCarts] = useState([]);
	const [pageLoad, setPageLoad] = useState(true);
	const router = useRouter();
	useEffect(() => {
		if (signinStore.isLoggedin) {
			setPageLoad(false);
			axiosInstance
				.get(`/cart/shipped/${signinStore.data._id}`)
				.then((response) => {
					setShippedCarts(response.data);
				})
				.catch((err) => {});
		} else {
			setPageLoad(false);
		}
	}, [signinStore.isLoggedin, signinStore.data?._id]);

	const renderShippedCarts = () => {
		if (shippedCarts.length > 0) {
			return shippedCarts.map((cart) => {
				return <ShippedComponent key={cart._id} cart={cart} />;
			});
		} else {
			return "No cart shipped";
		}
	};

	return pageLoad ? (
		<Spinner className={"w-64 h-64 m-auto"} />
	) : (
		<div className="text-primary">
			<div className="text-lg font-bold p-5 flex">My Shipped Carts</div>
			<hr className="border-2" />
			<div className="grid grid-flow-row gap-8">{renderShippedCarts()}</div>
		</div>
	);
};

export default ShippedCart;
