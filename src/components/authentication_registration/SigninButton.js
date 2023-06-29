import { useRouter } from "next/router";
import CustomButton from "../buttons/CustomButton";

const SigninButton = ({ setShowMenu }) => {
	const router = useRouter();

	return (
		<CustomButton
			text="Signin"
			variant={"light"}
			onClick={(e) => {
				setShowMenu(false);
				router.push("/signin");
			}}
		/>
	);
};

export default SigninButton;
