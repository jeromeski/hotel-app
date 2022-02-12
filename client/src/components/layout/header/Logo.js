import React from "react";
import { Link } from "react-router-dom";

function Logo() {
	return (
		<div className="logo">
			<Link to="/">
				<h3>Logo</h3>
			</Link>
		</div>
	);
}

export default Logo;
