import { useAuthContext } from "context/Auth";
import { useStripeStatusMutation } from "framework/basic-rest/auth/use-stripe";
import React, { useEffect } from "react";

function StripeCallback() {
	const { state } = useAuthContext();
	const { auth } = state;

	const { mutate: accountStatus } = useStripeStatusMutation();

	useEffect(() => {
		if (auth && auth.token) {
			accountStatus();
		}
	}, [auth]);

	return (
		<div className="d-flex justify-content-center p-5">
			<h1>Loading...</h1>
		</div>
	);
}

export default StripeCallback;
