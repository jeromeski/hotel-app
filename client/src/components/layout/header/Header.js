import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "./Logo";
import "./header.css";
import { useAuthContext } from "context/Auth";

function Header() {
	const { auth, logout } = useAuthContext();
	console.log("header state auth ==>", auth);
	const history = useHistory();

	return (
		<header className="header">
			<div className="container pt-3 pb-3">
				<div className="row">
					<div className="col-sm-12 d-flex justify-content-between align-items-center">
						<Logo />
						<nav>
							{!auth && (
								<Fragment>
									<Link className="auth-link" to="/login">
										Login
									</Link>
									<Link className="auth-link" to="/register">
										Register
									</Link>
								</Fragment>
							)}
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
						</nav>
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
