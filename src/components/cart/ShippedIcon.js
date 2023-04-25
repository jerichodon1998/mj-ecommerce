import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/router";

const ShippedIcon = () => {
	const router = useRouter();

	const onClickShipping = () => {
		router.push("/shipped");
	};

	return (
		<LocalShippingIcon
			className="cursor-pointer h-8 w-8"
			fontSize="inherit"
			onClick={onClickShipping}
		/>
	);
};

export default ShippedIcon;
