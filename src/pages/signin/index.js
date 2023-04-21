import CustomButton from "@/components/buttons/CustomButton";
import Spinner from "@/components/loader/Spinner";
import {
	resetSigninState,
	signinUser,
} from "@/redux/authentitcationRegistration/signinSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SigninPage = () => {
	const [pageLoad, setPageLoad] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const signinStore = useSelector((state) => state.signinStore);

	const dispatch = useDispatch();

	const onSignin = (e) => {
		e.preventDefault();
		dispatch(resetSigninState());
		dispatch(signinUser({ email, password }));
	};

	useEffect(() => {
		setPageLoad(false);
	}, [dispatch]);

	useEffect(() => {
		if (signinStore.isLoggedin) {
			router.push("/");
		}
	}, [signinStore.isLoggedin, router]);

	const renderSignin = () => {
		return (
			<div className="m-auto grid grid-cols-3 bg-tertiary p-10">
				<div className="col-span-1 text-white text-5xl border-r-2 border-secondary">
					Signin
				</div>
				<div className="col-span-2 grid grid-cols-2 p-5 text-white">
					<form className="col-span-1 grid gap-4" onSubmit={onSignin}>
						<input
							type="email"
							required={true}
							className="p-1 rounded-sm text-secondary"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							required={true}
							className="p-1 rounded-sm text-secondary"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<CustomButton
							variant={"dark"}
							text={"Signin"}
							type={"submit"}
							classname={"m-auto"}
							isLoading={signinStore?.isLoading}
						/>
					</form>
				</div>
			</div>
		);
	};

	return pageLoad ? <Spinner className={"m-auto w-64 h-64"} /> : renderSignin();
};

export default SigninPage;
