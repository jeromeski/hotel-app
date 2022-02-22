import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "context/Auth";
import { useStripeStatusMutation } from "framework/basic-rest/stripe/use-stripe";
import LoadingOverlay from "components/common/LoadingOverlay";

function StripeCallback() {
	const { state } = useAuthContext();
	const { auth } = state;

	const { mutate: accountStatus, isLoading, isSuccess } = useStripeStatusMutation();
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

	return isLoading && !isSuccess ? (
		<LoadingOverlay isActive={true} spinner text="Connecting with Stripe..." />
	) : (
		<Fragment></Fragment>
	);
}

export default StripeCallback;
