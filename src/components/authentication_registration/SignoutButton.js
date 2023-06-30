import { useRouter } from "next/router";
import CustomButton from "../buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
	resetSigninState,
	signoutuser,
} from "@/redux/authentitcationRegistration/signinSlice";

const SignoutButton = ({ setShowMenu }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const signinStore = useSelector((state) => state.signinStore);

	const onSignout = () => {
		dispatch(resetSigninState());
		dispatch(signoutuser());
		setShowMenu(false);
		router.push("/");
	};

	return (
		<CustomButton
			text="Signout"
			variant={"light"}
			isLoading={signinStore.isLoading}
			onClick={onSignout}
		/>
	);
};

export default SignoutButton;
