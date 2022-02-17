import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import headerStyles from "assets/css/header-styles.module.css";

function Header() {
	return (
		<header className={headerStyles.header}>
			<div className="container pt-3 pb-3">
				<div className="row">
					<div className="col-sm-12 d-flex justify-content-between align-items-center">
						<Logo />
						<HeaderMenu />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;


