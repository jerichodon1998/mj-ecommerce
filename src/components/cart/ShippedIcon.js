import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/router";

const ShippedIcon = ({ setShowMenu }) => {
	const router = useRouter();

	const onClickShipping = () => {
		setShowMenu(false);
		router.push("/shipped");
	};

	return (
		<LocalShippingIcon
			className="cursor-pointer h-8 w-8"
			onClick={onClickShipping}
		/>
	);
};

export default ShippedIcon;
