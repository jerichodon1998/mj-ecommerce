import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
	const year = new Date().getFullYear();
	const iconStyle = "cursor-pointer";
	return (
		<div className="bg-primary mt-auto p-5 d:h-32 w-full px-5 text-white grid grid-flow-col">
			<div className="text-center">
				<span>&copy; </span>
				copyright {year} Mark Jericho
				<br />
				All rights reserved.
			</div>
			<div className="flex flex-col text-center">
				<div>Follow me on:</div>
				<div>
					<a
						href="https://www.facebook.com/markjericho.manilag.35"
						target="_blank"
					>
						<FacebookIcon
							className={iconStyle}
							color="white"
							fontSize="large"
						/>
					</a>
					<a
						href="https://www.facebook.com/markjericho.manilag.35"
						target="_blank"
					>
						<TwitterIcon className={iconStyle} color="white" fontSize="large" />
					</a>
					<a href="https://twitter.com/jerichodon1998" target="_blank">
						<GitHubIcon className={iconStyle} color="white" fontSize="large" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
