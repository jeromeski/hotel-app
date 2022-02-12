import React from "react";
import { Link } from "react-router-dom";

function AuthMenu() {
	return (
		<nav>
			<Link className="auth-link" to="/login">
				Login
			</Link>
			<Link className="auth-link" to="/register">
				Register
			</Link>
		</nav>
	);
}

export default AuthMenu;
