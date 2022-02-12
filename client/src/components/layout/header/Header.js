import React from "react";
import AuthMenu from "./AuthMenu";
import Logo from "./Logo";
import "./header.css";

function Header() {
	return (
		<header className="header">
			<div className="container pt-3 pb-3">
				<div className="row">
					<div className="col-sm-12 d-flex justify-content-between align-items-center">
						<Logo />
						<AuthMenu />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
