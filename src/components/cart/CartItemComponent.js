import { createObjectUrlImage } from "@/helper/createObjectUrlImage";
import { axiosInstance } from "@/pages/api/axiosInstance";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";
import Image from "next/image";
import CustomButton from "../buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, resetCartSliceState } from "@/redux/cart/cartSlice";
import { useRouter } from "next/router";

const CartItemComponent = ({ itemId }) => {
	const signinStore = useSelector((state) => state.signinStore);
	const cartStore = useSelector((state) => state.cartStore);
	const dispatch = useDispatch();
	const router = useRouter();

	const [isComponentLoading, setIsComponentLoading] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [cartItem, setCartItem] = useState(null);
	const [productItem, setProductItem] = useState(null);
	const [error, setError] = useState(null);
	const [renderImage, setRenderImage] = useState(null);
	const [itemTotal, setItemTotal] = useState(0);

	const onRemoveItemFromCart = async () => {
		dispatch(resetCartSliceState());
		dispatch(
			removeFromCart({ uid: signinStore.data._id, cartItemId: cartItem._id })
		).then(async () => {
			axiosInstance
				.get(`/cart/${signinStore.data._id}`)
				.then(async (response) => {
					if (response.data.cartItemsId.length == 0) {
						axiosInstance
							.delete(`/cart/${signinStore.data._id}`)
							.catch(() => {});
					}
				});
		});
	};

	// get cart item
	useEffect(() => {
		setIsComponentLoading(true);
		if (itemId) {
			axiosInstance
				.get(`/cartitems/${itemId}`)
				.then((response) => {
					setCartItem(response.data);
					setIsComponentLoading(false);
				})
				.catch((error) => {
					setError(error.response);
					setIsComponentLoading(false);
				});
		}
	}, [itemId]);

	// get product item
	useEffect(() => {
		setIsComponentLoading(true);
		if (cartItem) {
			axiosInstance
				.get(`/products/${cartItem.productItemId}`)
				.then((response) => {
					setItemTotal(cartItem.quantity * response.data.price);
					setProductItem(response.data);
					setIsComponentLoading(false);
				})
				.catch((error) => {
					setError(error.response);
					setIsComponentLoading(false);
				});
		}
	}, [cartItem]);

	// get cart item image
	useEffect(() => {
		setIsImageLoading(true);
		if (productItem) {
			axiosInstance
				.get(`/images/${productItem.imagesId[0]}`, { responseType: "blob" })
				.then((response) => {
					setRenderImage(createObjectUrlImage(response.data));
					setIsImageLoading(false);
				})
				.catch((error) => {
					setError(error.response);
					setIsImageLoading(false);
				});
		}
	}, [productItem]);

	const renderProductItem = () => {
		if (productItem) {
			return (
				<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-flow-col gap-2">
					<div className="grid grid-flow-row gap-2">
						<div className="w-full lg:w-56 h-48 relative">
							{renderImage && isImageLoading === false ? (
								<Image src={renderImage} alt="product image" fill />
							) : (
								<Spinner className={"m-auto"} />
							)}
						</div>
						<div
							className="text-md lg:text-lg font-semibold text-secondary leading-3 cursor-pointer"
							onClick={() => router.push(`/products/${productItem._id}`)}
						>
							{productItem.name}
						</div>
					</div>
					<div className="grid grid-flow-row">
						<div>Price: ₱ {productItem.price}</div>
						<div>Quantity: {cartItem.quantity}</div>
						<div>
							Total: ₱{" "}
							<span className="text-xl text-secondary font-semibold">
								{itemTotal.toFixed(2)}
							</span>
						</div>
					</div>
					<div className="w-full lg:w-56">
						<div className="font-semibold text-lg">{productItem.brand}</div>
						<div className="overflow-scroll overflow-x-hidden h-64">
							{productItem.description}
						</div>
					</div>
					<div>
						<CustomButton
							text={"remove item"}
							variant={"light"}
							onClick={onRemoveItemFromCart}
							isLoading={cartStore.isLoading}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					{error?.data}{" "}
					<div>
						<CustomButton
							text={"remove item"}
							variant={"light"}
							onClick={onRemoveItemFromCart}
							isLoading={cartStore.isLoading}
						/>
					</div>
				</div>
			);
		}
	};

	return (
		<div className="bg-tertiary/25 p-5">
			{isComponentLoading ? (
				<Spinner className={`w-24 h-24 m-auto`} />
			) : (
				renderProductItem()
			)}
		</div>
	);
};

export default CartItemComponent;
