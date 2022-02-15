import React, { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "context/Auth";
import moment from "moment";
import { useStripeBalanceMutation } from "framework/basic-rest/auth/use-stripe";
import { currencyFormatter } from "utils";

function ConnectNav() {
	const [balance, setBalance] = useState();
	const { state } = useAuthContext();
	const { auth } = state;

	const { mutate: accountBalance, data } = useStripeBalanceMutation();

	useEffect(() => {
		let current = true;
		if (current) {
			accountBalance();
		}
		return () => (current = false);
	}, []);

	useEffect(() => {
		if (data) {
			setBalance(data);
		}
	}, [data]);

	console.log(balance);

	return (
		<div className="d-flex justify-content-between">
			<h5>{auth.user.name[0]}</h5>
			<p>{auth.user.name}</p>
			<p>{`Joined ${moment(auth.user.createdAt).fromNow()}`}</p>
			{auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
				<Fragment>
					<div>
						<h5>Pending Balance</h5>
						{balance &&
							balance.data &&
							balance.data.pending.map((bal, idx) => {
								return (
									<div key={idx}>
										<span>{currencyFormatter(bal)}</span>
									</div>
								);
							})}
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
