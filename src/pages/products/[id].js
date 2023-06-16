import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import Image from "next/image";
import { createObjectUrlImage } from "@/helper/createObjectUrlImage";
import Spinner from "@/components/loader/Spinner";
import CustomButton from "@/components/buttons/CustomButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	getUserCart,
	resetCartSliceState,
} from "@/redux/cart/cartSlice";
import QuantityComponent from "@/components/quantity/QuantityComponent";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";

const ProductPage = ({ product }) => {
	const [selectedImage, setSeletedImage] = useState(0);
	const [photosLoading, setPhotosLoading] = useState(true);
	const [renderImages, setRenderImages] = useState([]);
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();
	const router = useRouter();

	const signinStore = useSelector((state) => state.signinStore);
	const cartStore = useSelector((state) => state.cartStore);

	const showImages = () => {
		return renderImages.map((image, i) => {
			return (
				<div
					key={product.imagesId[i]}
					className="relative w-24 h-24"
					onClick={(e) => setSeletedImage(i)}
				>
					<Image
						src={image}
						alt="product image"
						fill
						className={`${
							selectedImage == i ? "border-2 border-red-500" : null
						}`}
					/>
				</div>
			);
		});
	};

	const onAddTocart = async () => {
		if (!signinStore.isLoggedin) {
			router.push("/signin");
		} else {
			axiosInstance
				.get(`/cart/${signinStore.data._id}`)
				.then((response) => {
					if (response.status === 200) {
						dispatch(resetCartSliceState());
						dispatch(
							addToCart({
								uid: signinStore.data._id,
								productId: product._id,
								quantity: quantity,
							})
						);
					}
				})
				.catch((error) => {
					if (error.response.status === 404) {
						axiosInstance
							.post(`/cart/${signinStore.data._id}`)
							.then((response) => {
								if (response.status === 200) {
									dispatch(resetCartSliceState());
									dispatch(
										addToCart({
											uid: signinStore.data._id,
											productId: product._id,
											quantity: quantity,
										})
									);
								}
							})
							.catch((error) => {});
					} else {
						dispatch(getUserCart(signinStore.data._id));
					}
				});
		}
	};

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
				dispatch(resetCartSliceState());
			} else {
				toast.error(cartStore.statusText);
				dispatch(resetCartSliceState());
			}
		}
	}, [
		dispatch,
		cartStore?.statusCode,
		cartStore.isRequestDone,
		cartStore.statusText,
		cartStore.data,
	]);

	// get product images
	useEffect(() => {
		setPhotosLoading(true);
		if (product) {
			let images = [];
			product?.imagesId.map((image) => {
				axiosInstance
					.get(`images/${image}`, { responseType: "blob" })
					.then((response) => {
						images.push(createObjectUrlImage(response.data));
						setRenderImages(() => [...images]);
						setPhotosLoading(false);
					})
					.catch((error) => {
						setPhotosLoading(false);
					});
			});
		}
	}, [product]);

	return (
		<>
			<Head>
				<title>{product?.name}</title>
			</Head>
			<div className="grid flex-wrap grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 py-5 bg-secondary/10 gap-4 shadow-xl border-none rounded-lg">
				<div className="grid grid-flow-row col-span-1 gap-4">
					<div className="w-full h-64 relative">
						{photosLoading > 0 ? (
							<Spinner className={"m-auto"} />
						) : (
							<Image
								src={renderImages[selectedImage]}
								alt="product image"
								fill
							/>
						)}
					</div>
					<div className="grid grid-flow-col overflow-x-auto bg-secondary/50 py-2 px-5">
						{photosLoading ? <Spinner className={"m-auto"} /> : showImages()}
					</div>
				</div>
				<div>
					<div className="bg-white rounded-lg my-2 p-1">
						Price:
						{new Intl.NumberFormat("php", {
							style: "currency",
							currency: "PHP",
						}).format(product?.price)}
					</div>
					<div className="bg-white rounded-lg my-2 p-1">
						Brand:
						{product?.brand}
					</div>
					<div className="bg-white rounded-lg my-2 p-1">{product?.name}</div>
					<div className="bg-white rounded-lg my-2 p-1">
						Stock:
						{product?.stock}
					</div>
					<div className="bg-white rounded-lg my-2 p-1">
						Rating:{product?.rating}
					</div>
				</div>
				<div>
					<div className="bg-white rounded-lg p-1 overflow-scroll overflow-x-hidden h-64">
						{product?.description}
					</div>
				</div>
				<div className="flex justify-center items-center">
					<div>
						<CustomButton
							variant={"dark"}
							classname={"w-40 p-5"}
							isLoading={cartStore.isLoading}
							onClick={onAddTocart}
						>
							<AddShoppingCartIcon className="cursor-pointer h-8 w-8" />
							Add to cart
						</CustomButton>
						<div className="flex justify-center items-center">
							<QuantityComponent
								quantity={quantity}
								setQuantity={setQuantity}
							/>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export const getServerSideProps = async (context) => {
	const id = context.params?.id;
	const response = await axiosInstance.get(`products/${id}`);
	return {
		props: {
			product: response.data,
		},
	};
};

export default ProductPage;
