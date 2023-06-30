import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

function GithubIconLink() {
	return (
		<a
			href="https://github.com/jerichodon1998"
			target="_blank"
			rel="noopener noreferrer"
		>
			<GitHubIcon className="cursor-pointer" color="white" fontSize="large" />
		</a>
	);
}

export default GithubIconLink;
