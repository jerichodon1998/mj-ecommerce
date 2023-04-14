import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";

const CartComponent = () => {
	const router = useRouter();
	const onClickCart = () => {
		router.push("/cart");
	};

	return (
		<ShoppingCartIcon
			className="cursor-pointer h-8 w-8"
			fontSize="inherit"
			onClick={onClickCart}
		/>
	);
};

export default CartComponent;
