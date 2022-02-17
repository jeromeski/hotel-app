import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "context/Auth";
import { useStripeStatusMutation } from "framework/basic-rest/auth/use-stripe";

function StripeCallback() {
	const { state } = useAuthContext();
	const { auth } = state;

	const { mutate: accountStatus } = useStripeStatusMutation();
	const history = useHistory();

	useEffect(() => {
		if (auth && auth.token) {
			accountStatus();
		}
	}, [auth, accountStatus]);

	useEffect(() => {
		const seller = auth.user.stripe_seller;
		if (seller) {
			history.push("/dashboard");
		}
	}, [auth.user.stripe_seller, history]);

	return (
		<div className="d-flex justify-content-center p-5">
			<h1>Loading...</h1>
		</div>
	);
}

export default StripeCallback;
