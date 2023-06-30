import { useRouter } from "next/router";

const Pagination_Component = ({ totalpages, currentpage, pathname }) => {
	let pages = [];
	const router = useRouter();
	for (let i = 1; i <= totalpages; i++) pages.push(i);

	return (
		<div className="text-center">
			{pages.map((page) => {
				if (page == currentpage) {
					return (
						<button key={page} className="p-1 m-1 h-8 bg-primary text-white">
							{page}
						</button>
					);
				} else {
					return (
						<button
							key={page}
							onClick={() => {
								router.push({ pathname: pathname, query: { page: page } });
							}}
							className="p-1 m-1 h-8 bg-white border-2 border-primary text-primary"
						>
							{page}
						</button>
					);
				}
			})}
		</div>
	);
};

export default Pagination_Component;
