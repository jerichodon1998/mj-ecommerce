import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";

function FBIconLink() {
	return (
		<a
			href="https://www.facebook.com/markjericho.manilag.35"
			target="_blank"
			rel="noopener noreferrer"
		>
			<FacebookIcon className="cursor-pointer" color="white" fontSize="large" />
		</a>
	);
}

export default FBIconLink;
