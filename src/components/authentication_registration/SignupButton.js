import { useRouter } from "next/router";
import CustomButton from "../buttons/CustomButton";

const SignupButton = ({ setShowMenu }) => {
	const router = useRouter();
	return (
		<CustomButton
			text="Signup"
			variant={"light"}
			onClick={(e) => {
				setShowMenu(false);
				router.push("/signup");
			}}
		/>
	);
};

export default SignupButton;
