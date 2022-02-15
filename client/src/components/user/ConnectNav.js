import React, { Fragment } from "react";
import { useAuthContext } from "context/Auth";
import moment from "moment";

function ConnectNav() {
	const { state } = useAuthContext();
	const { auth } = state;

	return (
		<div className="d-flex justify-content-between">
			<h5>{auth.user.name[0]}</h5>
			<p>{auth.user.name}</p>
			<p>{`Joined ${moment(auth.user.createdAt).fromNow()}`}</p>
			{auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
				<Fragment>
					<div>
						<p>Pending Balance</p>
					</div>
					<div>
						<p>Payout Settings</p>
					</div>
				</Fragment>
			)}
		</div>
	);
}

export default ConnectNav;
