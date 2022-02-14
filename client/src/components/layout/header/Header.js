import React from "react";
import { useAuthContext } from "context/Auth";

import Logo from "./Logo";
import "./header.css";
import HeaderMenu from "./HeaderMenu";

function Header() {
	const { state } = useAuthContext();
	console.log("header state auth ==>", state);

	return (
		<header className="header">
			<div className="container pt-3 pb-3">
				<div className="row">
					<div className="col-sm-12 d-flex justify-content-between align-items-center">
						<Logo />
						<HeaderMenu state={state} />
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
