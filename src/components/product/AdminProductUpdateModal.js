import { useState } from "react";
import CustomButton from "../buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { resetProductState, updateProduct } from "@/redux/product/productSlice";

const AdminProductUpdateModal = ({ product, image }) => {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState(product.name);
	const [description, setDescription] = useState(product.description);
	const [price, setPrice] = useState(product.price);
	const [category, setCategory] = useState(product.category);
	const [stock, setStock] = useState(product.stock);
	const [renderImage, setRenderImage] = useState(image);
	const [brand, setBrand] = useState(product.brand);
	const [currency, setCurrency] = useState(product.currency);

	const productStore = useSelector((state) => state.productStore);
	const dispatch = useDispatch();

	const onSubmitUpdate = (e) => {
		e.preventDefault();
		dispatch(resetProductState());
		dispatch(
			updateProduct({
				name,
				description,
				price,
				category,
				stock,
				brand,
				currency,
				productId: product._id,
			})
		);
		if (!productStore.isLoading && productStore.error == null) {
			setShowModal(false);
		}
	};

	const showOptions = () => {
		return (
			<div
				className="bg-black bg-opacity-50 z-50 justify-center items-center flex top-0 left-0 h-full w-full overflow-auto fixed"
				onClick={(e) => {
					setShowModal(false);
				}}
			>
				<div className="bg-zinc-200 p-5 rounded-md" onClick={(e) => e.stopPropagation()}>
					<form onSubmit={onSubmitUpdate}>
						<div className="grid grid-flow-col gap-8">
							<div className="grid gap-8">
								<div>
									<label>Product name: </label>
									<input
										type={"text"}
										value={name}
										className="p-0.5 rounded-md"
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<label>Product category: </label>
									<input
										type={"text"}
										value={category}
										className="p-0.5 rounded-md"
										onChange={(e) => setCategory(e.target.value)}
									/>
								</div>
								<div>
									<label>Product description: </label>
									<textarea
										type={"text"}
										value={description}
										className="p-0.5 rounded-md"
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
							</div>
							<div className="grid gap-8">
								<div>
									<label>Stock: </label>
									<input
										type={"number"}
										value={stock}
										className="p-0.5 rounded-md"
										onChange={(e) => setStock(e.target.value)}
									/>
								</div>
								<div>
									<label>Price: </label>
									<input
										type={"number"}
										value={price}
										className="p-0.5 rounded-md"
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div>
									<label>Brand: </label>
									<input
										type={"text"}
										value={brand}
										className="p-0.5 rounded-md"
										onChange={(e) => setBrand(e.target.value)}
									/>
								</div>
							</div>
							<div>
								<label>Currency: </label>
								<input
									type={"text"}
									value={currency}
									className="p-0.5 rounded-md"
									onChange={(e) => setCurrency(e.target.value)}
								/>
							</div>
							{/* <div>
								<label>Images </label>
								<input
									disabled
									type={"file"}
									value={images}
									accept={"image/png, image/jpg, image/jpeg"}
									className="p-0.5 rounded-md"
									onChange={(e) => setImage(e.target.value)}
								/>
							</div> */}
						</div>
						<div className="grid grid-flow-col gap-8 mt-5">
							<CustomButton
								type="submit"
								variant={"dark"}
								classname={`w-full`}
								isLoading={productStore.isLoading}
							>
								Save
							</CustomButton>
							<CustomButton
								classname={`w-full`}
								type={"submit"}
								onClick={(e) => {
									setShowModal(false);
									// resetState();
								}}
								variant={"secondary"}
							>
								Cancel
							</CustomButton>
						</div>
					</form>
				</div>
			</div>
		);
	};

	return (
		<div>
			{showModal ? showOptions() : null}
			<CustomButton text={"Edit"} variant={"secondary"} onClick={(e) => setShowModal(true)} />
		</div>
	);
};

export default AdminProductUpdateModal;
