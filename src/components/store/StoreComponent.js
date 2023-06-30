import StorefrontIcon from "@mui/icons-material/Storefront";

import { useRouter } from "next/router";

const StoreComponent = ({ setShowMenu }) => {
	const router = useRouter();

	const onClickStore = () => {
		setShowMenu(false);
		router.push("/store");
	};

	return (
		<>
			<StorefrontIcon
				className="cursor-pointer h-8 w-8"
				onClick={onClickStore}
			/>
		</>
	);
};

export default StoreComponent;
