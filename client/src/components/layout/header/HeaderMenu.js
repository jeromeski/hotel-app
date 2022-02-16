import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { useLogoutMutation } from "framework/basic-rest/auth/use-logout";
import { useAuthContext } from "context/Auth";

function HeaderMenu() {
	const history = useHistory();
	const { state } = useAuthContext();

	const { auth } = state;
	const { mutate: signOut } = useLogoutMutation();

	const handleLogout = () => {
		signOut();
		history.push("/login");
	};

	return (
		<Fragment>
			{auth !== null && (
				<nav>
					<Menu>
						<MenuButton>
							{auth.user.name} <span aria-hidden>▾</span>
						</MenuButton>
						<MenuList>
							<MenuItem onSelect={() => history.push("/dashboard")}>Dashboard</MenuItem>
							<MenuItem onSelect={handleLogout}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</nav>
			)}

			{auth === null && (
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
