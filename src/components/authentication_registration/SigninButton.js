import { useRouter } from "next/router";
import CustomButton from "../buttons/CustomButton";

const SigninButton = () => {
	const router = useRouter();

	return <CustomButton text="Signin" variant={"light"} onClick={(e) => router.push("/signin")} />;
};

export default SigninButton;
