import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import Spinner from "@/components/loader/Spinner";
import { createObjectUrlImage } from "@/helper/createObjectUrlImage";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import PortraitIcon from "@mui/icons-material/Portrait";
import Image from "next/image";
import CustomButton from "@/components/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
	resetProfileState,
	updateUserProfile,
} from "@/redux/profile/profileSlice";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";

const dataStyle = " lg:xl:text-xl font-semibold leading-3 text-primary/90";

const Profile = () => {
	const router = useRouter();
	const uid = router.query.id || null;
	const signinStore = useSelector((state) => state.signinStore);
	const profileStore = useSelector((state) => state.profileStore);
	const [pageLoading, setPageLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
	const [profilePicture, setProfilePicture] = useState(null);
	const dispatch = useDispatch();

	const [isDisabled, setisDisabled] = useState(true);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [newImage, setNewImage] = useState(null);
	const [isPhotoLoading, setIsPhotoLoading] = useState(true);

	useEffect(() => {
		// returned function will be called on component unmount
		return () => {
			dispatch(resetProfileState());
		};
	}, [dispatch]);

	// toast
	useEffect(() => {
		if (profileStore.isRequestDone) {
			if (profileStore?.statusCode >= 200 && profileStore?.statusCode < 300) {
				toast.success(profileStore.data);
			} else {
				toast.error(profileStore.statusText);
			}
		}
	}, [
		profileStore?.statusCode,
		profileStore.isRequestDone,
		profileStore.data,
		profileStore.statusText,
	]);

	// fetch user
	useEffect(() => {
		if (uid) {
			axiosInstance
				.get(`/profile/${uid}`)
				.then((response) => {
					setUserProfile(response);
					setPageLoading(false);
				})
				.catch((error) => {
					setUserProfile(error.response);
					setPageLoading(false);
				});
		}
	}, [uid]);

	// fetch user image
	useEffect(() => {
		setIsPhotoLoading(true);
		if (userProfile?.status == 200 && userProfile.data.profilePictureId) {
			axiosInstance
				.get(`/images/${userProfile.data.profilePictureId}`, {
					responseType: "blob",
				})
				.then((response) => {
					setProfilePicture(createObjectUrlImage(response.data));
					setIsPhotoLoading(false);
				})
				.catch(() => {
					setIsPhotoLoading(false);
				});
		}
		setIsPhotoLoading(false);
	}, [userProfile]);

	// if request is success
	useEffect(() => {
		if (profileStore.isSuccess) {
			setisDisabled(true);
		}
	}, [profileStore.isSuccess]);

	const changeAllow = () => {
		setisDisabled(!isDisabled);
		setEmail("");
		setAddress("");
		setPhoneNumber("");
	};

	const onProfileEditSubmit = (e) => {
		e.preventDefault();
		dispatch(resetProfileState());
		dispatch(
			updateUserProfile({
				email: email == "" ? null : email,
				address: address == "" ? null : address,
				phoneNumber: phoneNumber == "" ? null : phoneNumber,
				uid: signinStore.data._id,
				file: null,
			})
		);
	};

	const updatePicture = () => {
		dispatch(resetProfileState());
		dispatch(
			updateUserProfile({
				uid: signinStore.data._id,
				file: newImage || null,
			})
		);
	};

	const renderUserPhoto = () => {
		if (isPhotoLoading) {
			return <Spinner className={`fill-inherit`} />;
		} else if (profilePicture) {
			return <Image src={profilePicture} alt="user photo" fill />;
		} else {
			return <PortraitIcon className="w-32 h-32" />;
		}
	};

	const editAccount = () => {
		return (
			<div className="bg-white rounded-md p-5 grid grid-rows-4">
				<div className={`${dataStyle} row-span-1`}>
					Edit account{" "}
					<span
						className="text-blue-700 text-base font-normal underline cursor-pointer"
						onClick={changeAllow}
					>
						change
					</span>
				</div>
				<form
					className="row-span-3 grid grid-flow-row gap-4"
					onSubmit={onProfileEditSubmit}
				>
					<input
						className={`border-2 border-primary rounded-sm p-1 ${
							isDisabled ? "cursor-not-allowed" : null
						}`}
						type="text"
						disabled={isDisabled}
						placeholder="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<input
						className={`border-2 border-primary rounded-sm p-1 ${
							isDisabled ? "cursor-not-allowed" : null
						}`}
						type="text"
						disabled={isDisabled}
						placeholder="phone"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<input
						className={`border-2 border-primary rounded-sm p-1 ${
							isDisabled ? "cursor-not-allowed" : null
						}`}
						type="email"
						disabled={isDisabled}
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{isDisabled ? null : (
						<CustomButton
							type={"submit"}
							variant={"dark"}
							text={"Save"}
							isLoading={profileStore.isLoading}
						/>
					)}
				</form>
			</div>
		);
	};

	const renderProfile = () => {
		const userData = userProfile?.data;
		return (
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 bg-tertiary/25 p-5 text-tertiary gap-4">
				<div className="grid sm:col-span-full lg:col-span-1">
					<div className="grid grid-flow-row gap-4">
						<div className="w-32 h-32 relative">{renderUserPhoto()}</div>
						<div className="grid grid-cols-4 gap-4">
							<input
								className="cursor-pointer col-span-full"
								type="file"
								accept="image/png, image/jpeg, image/jpg"
								onChange={(e) => setNewImage(e.target.files[0])}
							/>
							{newImage ? (
								<>
									<CloseIcon
										onClick={() => setNewImage(null)}
										className="p-2 w-8 h-8 cursor-pointer"
									/>
									<CustomButton
										text={"Update picture"}
										variant={"dark"}
										classname={`w-32`}
										isLoading={profileStore.isLoading}
										onClick={updatePicture}
									/>
								</>
							) : null}
						</div>
					</div>
					<div>
						Name:{" "}
						<span className={dataStyle}>
							{userData.firstname} {userData.lastname}
						</span>
					</div>
					<div>
						Email: <span className={dataStyle}>{userData.email}</span>
					</div>
					<div>
						Username: <span className={dataStyle}>{userData.username}</span>
					</div>
				</div>
				<div className="bg-white rounded-md p-5 grid grid-rows-3">
					<div className={dataStyle}>Address & Contact</div>
					<div className="flex items-center">
						<HomeIcon fontSize="medium" />
						Address:{" "}
						<span className={dataStyle}>
							{userData?.address ? userData.address : "None"}
						</span>
					</div>
					<div className="flex items-center">
						<PhoneIcon fontSize="medium" />
						Contact:{" "}
						<span className={dataStyle}>
							{userData?.phoneNumber ? userData.phoneNumber : "None"}
						</span>
					</div>
				</div>
				{editAccount()}
			</div>
		);
	};

	const renderFetchedData = () => {
		if (userProfile?.status == 200) {
			return renderProfile();
		}

		return <div className="text-4xl">{userProfile?.data}</div>;
	};

	return pageLoading ? (
		<Spinner className={"w-64 h-64 m-auto"} />
	) : (
		<>
			{renderFetchedData()}
			<ToastContainer />
		</>
	);
};

export default Profile;
