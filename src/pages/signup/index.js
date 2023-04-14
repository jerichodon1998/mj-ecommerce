import CustomButton from "@/components/buttons/CustomButton";
import Spinner from "@/components/loader/Spinner";
import { registerUser, resetSignupState } from "@/redux/authentitcationRegistration/signupSlice";
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

	useEffect(() => {
		if (signupStore.isSuccess) {
			router.push("/signin");
		}
	}, [router, signupStore.isSuccess]);

	const renderSignup = () => {
		return (
			<div className="m-auto grid grid-cols-3 bg-tertiary p-10">
				<div className="col-span-1 text-white text-5xl border-r-2 border-secondary">
					Signup
				</div>
				<div className="col-span-2 grid grid-cols-2 p-5 text-white">
					<form className="col-span-1 grid gap-4" onSubmit={onSignup}>
						<div className="flex justify-between">
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
						<div className="flex justify-between">
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
						<div className="flex justify-between">
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
						<div className="flex justify-between">
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
						<div className="flex justify-between">
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
