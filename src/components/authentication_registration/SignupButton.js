import { useRouter } from "next/router";
import CustomButton from "../buttons/CustomButton";

const SignupButton = () => {
	const router = useRouter();
	return <CustomButton text="Signup" variant={"light"} onClick={(e) => router.push("/signup")} />;
};

export default SignupButton;
