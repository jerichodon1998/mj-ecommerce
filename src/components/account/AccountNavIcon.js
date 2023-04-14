import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const AccountNavIcon = () => {
	const router = useRouter();
	const uid = useSelector((state) => state.signinStore.data._id);
	const onIconClick = () => {
		router.push(`/profile/${uid}`);
	};
	return (
		<PersonOutlineIcon
			className="cursor-pointer h-8 w-8"
			fontSize="inherit"
			onClick={onIconClick}
		/>
	);
};

export default AccountNavIcon;
