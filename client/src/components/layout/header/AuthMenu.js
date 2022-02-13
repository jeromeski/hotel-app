import { Menu, MenuButton, MenuItem, MenuLink, MenuList } from "@reach/menu-button";
import { useAuthContext } from "context/Auth";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function UserMenu({ user }) {
	const { logout } = useAuthContext();
	return (
		<Menu>
			<MenuButton>{user.name}</MenuButton>
			<MenuList>
				<MenuItem onSelect={() => {}}>Dashboard</MenuItem>
				<MenuItem
					onSelect={() => {
						logout();
					}}>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);
}

function AuthMenu() {
	const { user } = useAuthContext();

	return (
		<nav>
			{user ? (
				<UserMenu user={user} />
			) : (
				<Fragment>
					<Link className="auth-link" to="/login">
						Login
					</Link>
					<Link className="auth-link" to="/register">
						Register
					</Link>
				</Fragment>
			)}
		</nav>
	);
}

export default AuthMenu;
