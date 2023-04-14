import SigninButton from "@/components/authentication_registration/SigninButton";
import SignupButton from "@/components/authentication_registration/SignupButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { persistUser, resetSigninState } from "@/redux/authentitcationRegistration/signinSlice";
import AccountNavIcon from "@/components/account/AccountNavIcon";
import SignoutButton from "@/components/authentication_registration/SignoutButton";
import CartComponent from "@/components/cart/CartComponent";
import StoreComponent from "@/components/store/StoreComponent";
import MenuIcon from "@mui/icons-material/Menu";

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

	const menuOptions = () => {
		return (
			<>
				<div className={`justify-evenly hidden lg:flex`}>
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
				<div className="gap-4 grid-flow-col justify-end hidden lg:grid">
					{signinStore.isLoggedin ? (
						<>
							<AccountNavIcon />
							{signinStore.data.role == "admin" ? <StoreComponent /> : null}
							<CartComponent />
							<SignoutButton />
						</>
					) : (
						<>
							<SigninButton />
							<SignupButton />
						</>
					)}
				</div>
			</>
		);
	};

	const hamburgerMenu = () => {
		return (
			<MenuIcon
				onClick={(e) => {
					setShowMenu(!showMenu);
				}}
				fontSize="inherit"
				className="w-32 h-8 text-white lg:hidden"
			>
				{showMenu ? <div className="absoluteolute justify-end z-50 w-1/3">yawa</div> : null}
			</MenuIcon>
		);
	};

	return (
		<div className="bg-primary h-16 md:h-24 items-center justify-between px-5 text-white grid lg:grid-cols-3">
			<div>
				<span
					className="md:text-3xl lg:text-4xl xl:text-5xl cursor-pointer hover:underline"
					onClick={pushToHome}
				>
					Mj&apos;s Ecommerce
				</span>
			</div>
			{menuOptions()}
			{hamburgerMenu()}
		</div>
	);
};

export default Header;
