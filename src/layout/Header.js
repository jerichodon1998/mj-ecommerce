import SigninButton from "@/components/authentication_registration/SigninButton";
import SignupButton from "@/components/authentication_registration/SignupButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	persistUser,
	resetSigninState,
} from "@/redux/authentitcationRegistration/signinSlice";
import AccountNavIcon from "@/components/account/AccountNavIcon";
import SignoutButton from "@/components/authentication_registration/SignoutButton";
import CartComponent from "@/components/cart/CartComponent";
import StoreComponent from "@/components/store/StoreComponent";
import MenuIcon from "@mui/icons-material/Menu";
import ShippedComponent from "@/components/cart/ShippedIcon";

const Header = () => {
	const router = useRouter();
	const signinStore = useSelector((state) => state.signinStore);
	const dispatch = useDispatch();

	const [showMenu, setShowMenu] = useState(false);

	const navStyle =
		"transition delay-150 duration-300 ease-in-out underline cursor-pointer hover:scale-150";

	useEffect(() => {
		dispatch(resetSigninState());
		dispatch(persistUser());
	}, [dispatch]);

	const pushToHome = (e) => {
		e.preventDefault();
		router.push("/");
	};

	const renderOptions = () => {
		if (signinStore?.isLoggedin) {
			if (signinStore?.data.role === "admin") {
				return (
					<div className="flex gap-4">
						<AccountNavIcon />
						<StoreComponent />
						<CartComponent />
						<ShippedComponent />
						<SignoutButton />
					</div>
				);
			} else {
				return (
					<div className="flex gap-4">
						<AccountNavIcon />
						<CartComponent />
						<ShippedComponent />
						<SignoutButton />
					</div>
				);
			}
		} else {
			return (
				<div className="flex gap-4">
					<SigninButton />
					<SignupButton />
				</div>
			);
		}
	};

	const menu = () => {
		return (
			<>
				<div
					className={`grid grid-flow-col gap-8 justify-between md:justify-end`}
				>
					<div className="flex gap-8 ">
						<div className={navStyle} onClick={pushToHome}>
							Home
						</div>
						<div className={navStyle} onClick={(e) => router.push("/about")}>
							About
						</div>
						<div className={navStyle} onClick={(e) => router.push("/contact")}>
							Contact
						</div>
					</div>
					<div className="hidden lg:flex">{renderOptions()}</div>
					<MenuIcon
						className="w-8 h-8 hidden"
						onClick={() => {
							setShowMenu(!showMenu);
						}}
					/>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="bg-primary h-40 sm:h-32 md:h-24 items-center px-5 text-white grid justify-center grid-cols-1 md:grid-cols-2">
				<div>
					<span
						className="text-4xl xl:text-5xl cursor-pointer hover:underline"
						onClick={pushToHome}
					>
						Mj&apos;s Ecommerce
					</span>
				</div>
				{menu()}
			</div>
			<div
				className={` ${
					showMenu ? "bg-primary w-full" : "hidden"
				} absolute z-50 flex gap-8 justify-center text-white p-5 lg:hidden`}
			>
				{renderOptions()}
			</div>
		</>
	);
};

export default Header;
