import { createProduct, resetProductState } from "@/redux/product/productSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../buttons/CustomButton";

const AdminCreateProductModal = () => {
	const signinStore = useSelector((state) => state.signinStore);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [price, setPrice] = useState(0);
	const [currency, setCurrency] = useState("");
	const [images, setImages] = useState(null);

	const dispatch = useDispatch();

	const onProductSubmit = (e) => {
		e.preventDefault();

		// Turn Filelist into array of files
		let file = [];
		for (const image of images) {
			file.push(image);
		}
		dispatch(resetProductState());
		dispatch(
			createProduct({
				name,
				description,
				brand,
				category,
				stock,
				file,
				price,
				currency,
				ownerId: signinStore?.data?._id,
			})
		);
	};
	return (
		<div className="bg-zinc-600 p-5 my-10 shadow-md shadow-zinc-600">
			<div className="text-center text-2xl text-white">Create A Product</div>
			<form onSubmit={onProductSubmit}>
				<div className="grid rounded-md grid-cols-3 gap-4">
					<div className="col-span-1">
						<div className="grid grid-cols-2 gap-4">
							<label className="mr-1 text-white">Product Name:</label>
							<input
								required
								className="rounded-md p-1"
								type={"text"}
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder={"name"}
							/>

							<label className="mr-1 text-white">Description:</label>
							<input
								required
								className="rounded-md p-1"
								type={"text"}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder={"description"}
							/>
							<label className="mr-1 text-white">Brand:</label>
							<input
								required
								className="rounded-md p-1"
								type={"text"}
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
								placeholder={"brand"}
							/>

							<label className="mr-1 text-white">Category:</label>
							<input
								required
								className="rounded-md p-1"
								type={"text"}
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder={"category"}
							/>
							<label className="mr-1 text-white">Currency:</label>
							<input
								required
								className="rounded-md p-1"
								type={"text"}
								value={currency}
								onChange={(e) => setCurrency(e.target.value)}
								placeholder={"currency"}
							/>
							<label className="mr-1 text-white">Stock:</label>
							<input
								required
								className="rounded-md p-1"
								type={"number"}
								value={stock}
								onChange={(e) => setStock(e.target.value)}
								placeholder={"stock"}
							/>
							<label className="mr-1 text-white">Price:</label>
							<input
								required
								className="rounded-md p-1"
								type={"number"}
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								placeholder={"stock"}
							/>
						</div>
					</div>
					<div className="col-span-1">
						<input
							required
							className="bg-zinc-200 rounded-md"
							type={"file"}
							onChange={(e) => setImages(e.target.files)}
							multiple
							accept="image/jpg, image/jpeg, image/png"
						/>
					</div>
					<CustomButton
						classname={`w-32`}
						type={"submit"}
						text={"Create Product"}
						variant={"dark"}
					/>
				</div>
			</form>
		</div>
	);
};

export default AdminCreateProductModal;
