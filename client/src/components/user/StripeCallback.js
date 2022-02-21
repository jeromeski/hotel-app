import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "context/Auth";
import { useStripeStatusMutation } from "framework/basic-rest/stripe/use-stripe";

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
		if (auth && auth.user && auth.user.stripe_seller) {
			history.push("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth, auth.user, auth.user.stripe_seller]);

	return (
		<div className="d-flex justify-content-center p-5">
			<h1>Loading...</h1>
		</div>
	);
}

export default StripeCallback;
