import { createObjectUrlImage } from "@/helper/createObjectUrlImage";
import { axiosInstance } from "@/pages/api/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";
import CustomButton from "../buttons/CustomButton";
import AdminProductUpdateModal from "./AdminProductUpdateModal";

const AdminProductCard = ({ product }) => {
	const [renderImage, setRenderImage] = useState(null);
	const [pageLoad, setPageLoad] = useState(false);
	const router = useRouter();

	const {
		_id,
		category,
		brand,
		currency,
		description,
		imagesId,
		ownerId,
		name,
		price,
		rating,
		stock,
	} = product;

	const pushToProduct = () => {
		router.push(`products/${_id}`);
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
			.catch((error) => {
				setPageLoad(false);
			});
	}, [imagesId]);

	return pageLoad ? (
		<Spinner className={"m-auto"} />
	) : (
		<div className="w-full h-64 bg-secondary/25 shadow-md shadow-secondary/25 rounded-md text-primary grid grid-cols-5 gap-4 p-5">
			<div className="w-56 h-48 relative cursor-pointer col-span-1" onClick={pushToProduct}>
				{renderImage ? <Image src={renderImage} alt={name} fill /> : null}
				{pageLoad ? <Spinner className={"m-auto"} /> : null}
			</div>
			<div onClick={pushToProduct} className="grid col-span-1">
				<div>
					Name:{" "}
					<span className="font-bold text-xl text-primary leading-3 cursor-pointer ">
						{name}
					</span>
				</div>
				<div className=" col-span-1">
					Category:{" "}
					<span className="font-bold text-xl text-primary leading-3 cursor-pointer ">
						{category}
					</span>
				</div>
				<div className=" col-span-1">
					Brand:{" "}
					<span className="font-bold text-xl text-primary leading-3 cursor-pointer ">
						{brand}
					</span>
				</div>
			</div>
			<div className="grid grid-flow-row col-span-1">
				<div className="font-bold">stock: {stock}</div>
				<div>Currency: {currency}</div>
				<div>
					Price: <span className="font-bold text-3xl leading-3">$</span>
					<span className="text-secondary">{price}</span>
				</div>
			</div>
			<div className="w-56 col-span-1">{description}</div>
			<div className="grid grid-flow-row col-span-1">
				<AdminProductUpdateModal product={product} renderImage={renderImage} />
				<CustomButton text={"Delete"} variant={"dark"} />
			</div>
		</div>
	);
};

export default AdminProductCard;
