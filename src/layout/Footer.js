import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
	const year = new Date().getFullYear();
	const iconStyle = "cursor-pointer";
	return (
		<div className="bg-primary mt-auto h-24 md:h-32 w-full items-center px-5 text-white grid grid-flow-col">
			<div className="text-center">
				<span className="text-lg">&copy; </span>
				copyright {year} Mark Jericho Manilag.
				<br />
				All rights reserved.
			</div>
			<div className="grid grid-flow-row text-center">
				<div>Follow me on:</div>
				<br />
				<div>
					<FacebookIcon className={iconStyle} color="white" fontSize="large" />
					<TwitterIcon className={iconStyle} color="white" fontSize="large" />
					<GitHubIcon className={iconStyle} color="white" fontSize="large" />
				</div>
			</div>
		</div>
	);
};

export default Footer;
