import { createObjectUrlImage } from "@/helper/createObjectUrlImage";
import { axiosInstance } from "@/pages/api/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../loader/Spinner";

const ProductCard = ({ product }) => {
	const [renderImage, setRenderImage] = useState(null);
	const [pageLoad, setPageLoad] = useState(false);
	const router = useRouter();

	const {
		_id,
		// category, no current use just yet
		// currency,
		description,
		imagesId,
		// ownerId,
		name,
		price,
		// rating,
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
			.catch(() => {
				setPageLoad(false);
			});
	}, [imagesId]);

	return (
		<div className="w-64 h-96 border-2 border-primary/5 shadow-lg rounded-md justify-center items-center grid grid-flow-row ">
			<div
				className="w-56 h-48 relative cursor-pointer"
				onClick={pushToProduct}
			>
				{renderImage ? <Image src={renderImage} alt={name} fill /> : null}
				{pageLoad ? <Spinner className={"m-auto"} /> : null}
			</div>
			{pageLoad ? (
				<Spinner className={"m-auto"} />
			) : (
				<div className="grid grid-flow-row gap-4">
					<div
						className="font-bold text-xl leading-3 cursor-pointer"
						onClick={pushToProduct}
					>
						{name.length > 15 ? `${name.substring(0, 15)} ...` : name}
					</div>
					<div className="flex justify-between">
						<div className="font-bold">stock: {stock}</div>
						<div>
							<span className="text-3xl leading-3">₱</span>
							<span className="">{price}</span>
						</div>
					</div>
					<div className="w-56">
						{description.length > 30
							? `${description.substring(0, 30)} ...`
							: description}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductCard;
