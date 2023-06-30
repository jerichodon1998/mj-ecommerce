import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconLink from "@/components/icons/IconLink";

const Footer = () => {
	const year = new Date().getFullYear();
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
					<IconLink
						Icon={
							<FacebookIcon
								className="cursor-pointer"
								color="white"
								fontSize="large"
							/>
						}
						href={"https://www.facebook.com/markjericho.manilag.35"}
					/>
					<IconLink
						Icon={
							<TwitterIcon
								className="cursor-pointer"
								color="white"
								fontSize="large"
							/>
						}
						href={"https://twitter.com/jerichodon1998"}
					/>
					<IconLink
						Icon={
							<GitHubIcon
								className="cursor-pointer"
								color="white"
								fontSize="large"
							/>
						}
						href={"https://github.com/jerichodon1998"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;
