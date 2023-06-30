import Spinner from "@/components/loader/Spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import Pagination_Component from "@/components/pagination/Pagination_Component";
import AdminProductCard from "@/components/product/AdminProductCard";
import AdminCreateProductModal from "@/components/product/AdminCreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { resetProductState } from "@/redux/product/productSlice";
import Head from "next/head";

const Store = () => {
	const [products, setProducts] = useState(null);
	const productStore = useSelector((state) => state.productStore);
	const signinStore = useSelector((state) => state.signinStore);
	const dispatch = useDispatch();
	const router = useRouter();
	const [pageLoad, setPageLoad] = useState(false);
	const [pages, setPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (!signinStore?.data?.role?.includes("admin")) {
			router.push("/");
		}
	}, [router, signinStore]);

	useEffect(() => {
		setCurrentPage(router.query.page);
		if (currentPage) {
			setPageLoad(true);
			axiosInstance
				.get(`products/?page=${currentPage}`)
				.then((response) => {
					setProducts(response.data.products);
					setPages(response.data.pages);
					setPageLoad(false);
				})
				.catch(() => {
					setPageLoad(false);
				});
		}
	}, [router, currentPage]);

	// reset state
	useEffect(() => {
		dispatch(resetProductState());
	}, [dispatch]);

	// toast
	useEffect(() => {
		if (productStore.isRequestDone) {
			if (productStore?.statusCode >= 200 && productStore?.statusCode < 300) {
				toast.success(productStore.data);
			} else {
				toast.error(productStore.statusText);
			}
		}
	}, [
		productStore?.statusCode,
		productStore.isRequestDone,
		productStore.data,
		productStore.statusText,
	]);
	const renderProducts = () => {
		return (
			<div className="grid place-items-center grid-flow-row gap-8">
				{products?.map((product) => {
					return <AdminProductCard key={product?._id} product={product} />;
				})}
			</div>
		);
	};

	const renderPage = () => {
		return (
			<div>
				<div className="text-center text-2xl p-10">My Store</div>
				<AdminCreateProductModal />
				<div>{renderProducts()}</div>
			</div>
		);
	};
	return pageLoad ? (
		<Spinner className={"w-64 h-64 m-auto"} />
	) : (
		<>
			<Head>
				<title>My Store</title>
			</Head>
			{renderPage()}
			<Pagination_Component
				currentpage={currentPage}
				totalpages={pages}
				pathname={"/store"}
			/>
			<ToastContainer />
		</>
	);
};

export default Store;
