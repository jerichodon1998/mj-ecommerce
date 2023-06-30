import { createObjectUrlImage } from "@/helper/createObjectUrlImage";
import { axiosInstance } from "@/pages/api/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";
import CustomButton from "../buttons/CustomButton";
import AdminProductUpdateModal from "./AdminProductUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, resetProductState } from "@/redux/product/productSlice";

const AdminProductCard = ({ product }) => {
	const [renderImage, setRenderImage] = useState(null);
	const [pageLoad, setPageLoad] = useState(false);
	const productStore = useSelector((state) => state.productStore);
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		_id,
		category,
		brand,
		currency,
		description,
		imagesId,
		// ownerId, not currently used
		name,
		price,
		// rating, not currently used
		stock,
	} = product;

	const pushToProduct = () => {
		router.push(`products/${_id}`);
	};

	const deleteProductFromStore = () => {
		dispatch(resetProductState());
		dispatch(deleteProduct({ productId: _id })).then(() => {
			imagesId.map((imageId) => {
				axiosInstance.delete(`/images/${imageId}`);
			});
		});
	};

	// get image by imageId
	useEffect(() => {
		setPageLoad(true);
		axiosInstance
			.get(`/images/${imagesId[0]}`, { responseType: "blob" })
			.then((response) => {
				setRenderImage(createObjectUrlImage(response.data));
				setPageLoad(false);
			})
			.catch(() => {
				setPageLoad(false);
			});
	}, [imagesId]);

	return pageLoad ? (
		<Spinner className={"m-auto"} />
	) : (
		<div className="w-full bg-secondary/25 shadow-md shadow-secondary/25 rounded-md text-primary grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
			<div
				className="max-w-sm h-48 relative cursor-pointer col-span-1"
				onClick={pushToProduct}
			>
				{renderImage ? (
					<Image
						className="flex justify-center items-center"
						src={renderImage}
						alt={name}
						fill
					/>
				) : null}
				{pageLoad ? <Spinner className={"m-auto"} /> : null}
			</div>
			<div className="grid col-span-1">
				<div>
					Name:{" "}
					<span
						onClick={pushToProduct}
						className="font-bold text-xl text-primary leading-3 cursor-pointer "
					>
						{name}
					</span>
				</div>
				<div className=" col-span-1">
					Category:{" "}
					<span className="font-bold text-xl text-primary leading-3">
						{category}
					</span>
				</div>
				<div className=" col-span-1">
					Brand:{" "}
					<span className="font-bold text-xl text-primary leading-3">
						{brand}
					</span>
				</div>
			</div>
			<div className="grid grid-flow-row col-span-1">
				<div className="font-bold">stock: {stock}</div>
				<div>Currency: {currency}</div>
				<div>
					Price: <span className="font-bold text-3xl leading-3">₱</span>
					<span className="text-secondary">{price}</span>
				</div>
			</div>
			<div className="min-w-56 col-span-1">
				<div className="overflow-scroll overflow-x-hidden max-h-40 w-full ">
					{description}
				</div>
			</div>
			<div className="grid grid-flow-col col-span-1  xl:grid-flow-row">
				<AdminProductUpdateModal product={product} renderImage={renderImage} />
				<CustomButton
					text={"Delete"}
					variant={"dark"}
					isLoading={productStore.isLoading}
					onClick={deleteProductFromStore}
				/>
			</div>
		</div>
	);
};

export default AdminProductCard;
