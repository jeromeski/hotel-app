import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { useLogoutMutation } from "framework/basic-rest/auth/use-logout";

function HeaderMenu({ state }) {
	const history = useHistory();
	console.log("HeaderMenu", state);
	const { mutate: signOut } = useLogoutMutation();

	const handleLogout = () => {
		signOut();
		history.push("/login");
	};

	return (
		<Fragment>
			{state?.auth !== null && (
				<nav>
					<Menu>
						<MenuButton>
							{state.auth.user.name} <span aria-hidden>▾</span>
						</MenuButton>
						<MenuList>
							<MenuItem onSelect={() => history.push("/dashboard")}>Dashboard</MenuItem>
							<MenuItem onSelect={handleLogout}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</nav>
			)}

			{state?.auth === null && (
				<nav>
					<Fragment>
						<Link className="auth-link" to="/login">
							Login
						</Link>
						<Link className="auth-link" to="/register">
							Register
						</Link>
					</Fragment>
				</nav>
			)}
		</Fragment>
	);
}

export default HeaderMenu;

/*
<Menu>
						<MenuButton>{state.user.name}</MenuButton>
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
*/
