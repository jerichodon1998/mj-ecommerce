import CustomButton from "@/components/buttons/CustomButton";
import Spinner from "@/components/loader/Spinner";
import {
	registerUser,
	resetSignupState,
} from "@/redux/authentitcationRegistration/signupSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignupPage = () => {
	const [pageLoad, setPageLoad] = useState(true);
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signupStore = useSelector((state) => state.signupStore);

	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
		setPageLoad(false);
		dispatch(resetSignupState());
	}, [dispatch]);

	const onSignup = (e) => {
		e.preventDefault();
		dispatch(resetSignupState());
		dispatch(registerUser({ email, firstname, lastname, password, username }));
	};

	const signupError = () => {
		if (signupStore.statusCode == 400 || signupStore.statusCode == 404) {
			return (
				<div className="bg-red-600 rounded-md p-2 text-center">
					{signupStore.error}
				</div>
			);
		}
	};

	useEffect(() => {
		if (signupStore.isSuccess) {
			router.push("/signin");
		}
	}, [router, signupStore.isSuccess]);

	const renderSignup = () => {
		return (
			<div className="m-auto grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 bg-tertiary p-10">
				<div className="text-white text-5xl lg:border-r-2 xl:border-r-2 border-secondary">
					Signup
				</div>
				<div className="col-span-2 flex justify-start items-start p-5 text-white">
					<form className="col-span-1 grid gap-4" onSubmit={onSignup}>
						<div className="grid lg:grid-flow-col xl:grid-flow-col md:grid-flow-col sm:grid-flow-col xs:grid-flow-row justify-between gap-4">
							<span>First name </span>
							<input
								type="text"
								required={true}
								className="p-1 rounded-sm text-secondary"
								placeholder="First name"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
							/>
						</div>
						<div className="grid lg:grid-flow-col xl:grid-flow-col md:grid-flow-col sm:grid-flow-col xs:grid-flow-row justify-between gap-4">
							<span>Last name </span>
							<input
								type="text"
								required={true}
								className="p-1 rounded-sm text-secondary"
								placeholder="Last name"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
						</div>
						<div className="grid lg:grid-flow-col xl:grid-flow-col md:grid-flow-col sm:grid-flow-col xs:grid-flow-row justify-between gap-4">
							<span>Username </span>
							<input
								type="text"
								required={true}
								className="p-1 rounded-sm text-secondary"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="grid lg:grid-flow-col xl:grid-flow-col md:grid-flow-col sm:grid-flow-col xs:grid-flow-row justify-between gap-4">
							<span>Email </span>
							<input
								type="email"
								required={true}
								className="p-1 rounded-sm text-secondary"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid lg:grid-flow-col xl:grid-flow-col md:grid-flow-col sm:grid-flow-col xs:grid-flow-row justify-between gap-4">
							<span>Password </span>
							<input
								type="password"
								required={true}
								className="p-1 rounded-sm text-secondary"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{signupError()}
						<CustomButton
							type={"submit"}
							variant={"dark"}
							text={"Signup"}
							classname={"m-auto"}
							isLoading={signupStore.isLoading}
						/>
					</form>
				</div>
			</div>
		);
	};

	return pageLoad ? <Spinner className={"m-auto w-64 h-64"} /> : renderSignup();
};

export default SignupPage;
