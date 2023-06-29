import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";

const CartComponent = ({ setShowMenu }) => {
	const router = useRouter();
	const onClickCart = () => {
		setShowMenu(false);
		router.push("/cart");
	};

	return (
		<ShoppingCartIcon
			className="cursor-pointer h-8 w-8"
			onClick={onClickCart}
		/>
	);
};

export default CartComponent;
