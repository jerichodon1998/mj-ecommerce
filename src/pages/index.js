import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "./api/axiosInstance";
import Spinner from "@/components/loader/Spinner";
import { useRouter } from "next/router";
import Pagination_Component from "@/components/pagination/Pagination_Component";

export default function Home() {
	const router = useRouter();
	const [products, setProducts] = useState();
	const [pageLoad, setPageLoad] = useState(false);
	const [pages, setPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

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
				.catch((error) => {
					setPageLoad(false);
				});
		}
	}, [router, currentPage]);

	const renderProducts = () => {
		return (
			<div className="grid place-items-center lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 xm:grid-cols-1 gap-8">
				{products?.map((product) => {
					return <ProductCard key={product?._id} product={product} />;
				})}
			</div>
		);
	};

	return pageLoad ? (
		<Spinner className={"w-64 h-64 m-auto"} />
	) : (
		<>
			{renderProducts()}
			<div>
				<Pagination_Component
					totalpages={pages}
					pathname="/"
					currentpage={currentPage}
				/>
			</div>
		</>
	);
}
