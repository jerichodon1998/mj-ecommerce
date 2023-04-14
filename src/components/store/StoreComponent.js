import StorefrontIcon from "@mui/icons-material/Storefront";

import { useRouter } from "next/router";
import { useState } from "react";

const StoreComponent = () => {
	const router = useRouter();

	const onClickStore = () => {
		router.push("/store");
	};

	return (
		<>
			<StorefrontIcon
				className="cursor-pointer h-8 w-8"
				fontSize="inherit"
				onClick={onClickStore}
			/>
		</>
	);
};

export default StoreComponent;
