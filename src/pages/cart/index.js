import { checkOutCart, resetCartSliceState } from "@/redux/cart/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../api/axiosInstance";
import Spinner from "@/components/loader/Spinner";
import CartItemComponent from "@/components/cart/CartItemComponent";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "@/components/buttons/CustomButton";

const MyCart = () => {
	const cartStore = useSelector((state) => state.cartStore);
	const signinStore = useSelector((state) => state.signinStore);
	const [isPageLoad, setIsPageLoad] = useState(false);

	const [cartTotal, setCartTotal] = useState(0);
	const [cart, setCart] = useState(null);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const onCheckOut = () => {
		dispatch(resetCartSliceState());
		dispatch(checkOutCart({ uid: signinStore.data._id }));
	};

	useEffect(() => {
		dispatch(resetCartSliceState());
	}, [dispatch]);

	useEffect(() => {
		// returned function will be called on component unmount
		return () => {
			dispatch(resetCartSliceState());
		};
	}, [dispatch]);

	// toast
	useEffect(() => {
		if (cartStore.isRequestDone) {
			if (cartStore?.statusCode >= 200 && cartStore?.statusCode < 300) {
				toast.success(cartStore.data);
			} else {
				toast.error(cartStore.error);
			}
		}
	}, [
		cartStore?.statusCode,
		cartStore.isRequestDone,
		cartStore.data,
		cartStore.error,
	]);

	// get user cart
	useEffect(() => {
		setIsPageLoad(true);
		dispatch(resetCartSliceState());
		if (signinStore.isLoggedin) {
			axiosInstance
				.get(`/cart/${signinStore.data._id}`)
				.then((response) => {
					setCart(response.data);
					setIsPageLoad(false);
				})
				.catch((error) => {
					setError(error.response.data);
					setIsPageLoad(false);
				});
		}
		if (!signinStore.isLoggedin) {
			setError("You are not signed in");
			setIsPageLoad(false);
		}
	}, [dispatch, signinStore.isLoggedin, signinStore.data]);

	// cart total
	useEffect(() => {
		let total = 0;
		if (cart) {
			cart.cartItemsId.map((itemId) => {
				axiosInstance.get(`/cartitems/${itemId}`).then((response) => {
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
							.catch((error) => {
								console.error(error);
							});
					}
				});
			});
		}
	}, [cart]);

	const renderCart = () => {
		if (isPageLoad) {
			return <Spinner className={"w-64 h-64 m-auto"} />;
		}
		if (cart) {
			return (
				<div className="grid grid-flow-row gap-8">
					{cart?.cartItemsId.map((itemId) => {
						return <CartItemComponent key={itemId} itemId={itemId} />;
					})}
				</div>
			);
		} else {
			return <div>{error?.data}</div>;
		}
	};

	return (
		<div className="mb-40">
			{renderCart()}
			<div className="bg-secondary text-white p-5 grid grid-flow-col">
				<div>
					TOTAL: ₱<span className="text-xl">{cartTotal}</span>
				</div>
				<CustomButton
					text={"Check Out"}
					variant={"light"}
					isLoading={cartStore.isLoading}
					onClick={onCheckOut}
				/>
			</div>
			<ToastContainer />
		</div>
	);
};

export default MyCart;
