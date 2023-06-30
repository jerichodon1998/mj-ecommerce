import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "./api/axiosInstance";
import { useRouter } from "next/router";
import Pagination_Component from "@/components/pagination/Pagination_Component";

export default function Home({ products, pages }) {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(router.query.page);
	}, [router]);

	const renderProducts = () => {
		return (
			<div className="grid place-items-center lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 xm:grid-cols-1 gap-8">
				{products?.map((product) => {
					return <ProductCard key={product?._id} product={product} />;
				})}
			</div>
		);
	};

	return (
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

export const getServerSideProps = async (context) => {
	const pageNumber = context.query?.page;
	// get products
	const response = await axiosInstance.get(`products/?page=${pageNumber}`);
	return {
		props: {
			products: response.data?.products,
			pages: response.data?.pages,
		},
	};
};
