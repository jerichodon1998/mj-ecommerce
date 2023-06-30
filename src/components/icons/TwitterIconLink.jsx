import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";

function TwitterIconLink() {
	return (
		<a
			href="https://twitter.com/jerichodon1998"
			target="_blank"
			rel="noopener noreferrer"
		>
			<TwitterIcon className="cursor-pointer" color="white" fontSize="large" />
		</a>
	);
}

export default TwitterIconLink;
