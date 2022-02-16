import React, { Fragment, useEffect } from "react";
import { useAuthContext } from "context/Auth";
import moment from "moment";
import {
	useStripeBalanceMutation,
	useStripeSettingsMutation
} from "framework/basic-rest/auth/use-stripe";
import { currencyFormatter } from "utils";

function ConnectNav() {
	const { state } = useAuthContext();
	const { auth } = state;

	const { mutate: accountBalance, data: balance } = useStripeBalanceMutation();
	const { mutate: payoutSettings, isLoading } = useStripeSettingsMutation();

	useEffect(() => {
		let current = true;
		if (current) {
			accountBalance();
		}
		return () => (current = false);
	}, [accountBalance]);

	return (
		<div className="d-flex justify-content-between">
			<h3>{auth.user.name[0]}</h3>
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
						<h5>Payout Settings</h5>
						<button type="button" onClick={payoutSettings}>
							{isLoading ? "Loading..." : <span>&#9881; Settings</span>}
						</button>
					</div>
				</Fragment>
			)}
		</div>
	);
}

export default ConnectNav;
