import FBIconLink from "@/components/icons/FBIconLink";
import GithubIconLink from "@/components/icons/GithubIconLink";
import TwitterIconLink from "@/components/icons/TwitterIconLink";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-primary mt-auto p-5 d:h-32 w-full px-5 text-white grid grid-flow-col">
			<div className="text-center">
				<span>&copy; </span>
				copyright {year} Mark Jericho
				<br />
				All rights reserved.
			</div>
			<div className="flex flex-col text-center">
				<div>Follow me on:</div>
				<div>
					<FBIconLink />
					<TwitterIconLink />
					<GithubIconLink />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
