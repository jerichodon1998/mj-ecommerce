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

	const signinError = () => {
		if (signinStore.statusCode == 400 || signinStore.statusCode == 404) {
			return (
				<div className="bg-red-600 rounded-md p-2 text-center">
					{signinStore.error}
				</div>
			);
		}
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
			<div className="m-auto grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 bg-tertiary p-10">
				<div className="col-span-1 text-white text-5xl lg:border-r-2 xl:border-r-2 border-secondary">
					Signin
				</div>
				<div className="col-span-1 grid p-5 text-white">
					<form className="col-span-1 grid gap-4 max-w-xs" onSubmit={onSignin}>
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
						{signinError()}
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
