import { useAuthContext } from "context/Auth";
import { useStripeConnectMutation } from "framework/basic-rest/auth/use-stripe";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function DashboardSeller() {
	const { state } = useAuthContext();
	const { auth } = state;

	const { mutate: connectAccount, isLoading, isError } = useStripeConnectMutation();

	const handleClick = () => {
		connectAccount();
	};

	const connected = () => (
		<div className="container">
			<div className="row">
				<div className="col-md-8 mt-5 d-flex justify-content-center">
					<h2>Hotels</h2>
				</div>
				<div className="col-md-4 mt-5 d-flex justify-content-center">
					<button type="button">
						<Link to="/hotels/new">Add Hotels +</Link>
					</button>
				</div>
			</div>
		</div>
	);
	const notConnected = () => {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 text-center mt-5">
						<h4>Setup stripe to post hotel rooms</h4>
						<p>Mern partners with stripe to transfer your earning to your bank account</p>
						<button type="button" onClick={handleClick}>
							{isLoading ? "Connecting..." : isError ? "Setup Payouts" : "Setup Payouts"}
						</button>
						<p className="mt-3">
							<small>You will be redirected to stripe, to complete onboarding process.</small>
						</p>
					</div>
				</div>
			</div>
		);
	};
	return (
		<Fragment>
			{auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled
				? connected()
				: notConnected()}
		</Fragment>
	);
}

export default DashboardSeller;
