import LoadingOverlay from "components/common/LoadingOverlay";
import { useStripeSuccessRequest } from "framework/basic-rest/stripe/use-stripe";
import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";

const StripeSuccess = ({ match }) => {
	const {
		mutate: onPaymentSuccess,
		data,
		isLoading,
		isSuccess,
		isError
	} = useStripeSuccessRequest();

	const history = useHistory();

	useEffect(() => {
		if (match) {
			onPaymentSuccess(match.params.hotelId);
		}
	}, []);

	useEffect(() => {
		if (isSuccess) {
			history.push("/dashboard");
		} else if (isError) {
			history.push("/stripe/cancel");
		}
	}, [isSuccess, isError]);

	return isLoading && !isSuccess ? (
		<LoadingOverlay isActive={true} spinner text="Connecting with Stripe..." />
	) : (
		<Fragment></Fragment>
	);
};

export default StripeSuccess;
