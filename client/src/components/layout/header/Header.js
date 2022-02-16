import React from "react";
import { useAuthContext } from "context/Auth";

import Logo from "./Logo";
import headerStyles from "assets/css/header-styles.module.css";
import HeaderMenu from "./HeaderMenu";

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

/*
{auth && (
								<Menu>
									<MenuButton>{auth.user.name}</MenuButton>
									<MenuList>
										<MenuItem
											onSelect={() => {
												history.push("/dashboard");
											}}>
											Dashboard
										</MenuItem>
										<MenuItem
											onSelect={() => {
												logout();
											}}>
											Logout
										</MenuItem>
									</MenuList>
								</Menu>
							)}
*/
