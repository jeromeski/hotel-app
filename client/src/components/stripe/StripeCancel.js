import LoadingOverlay from "components/common/LoadingOverlay";
import React, { Fragment } from "react";

const StripeCancel = ({ isLoading = true, isSuccess = false }) => {
	return isLoading && !isSuccess ? (
		<LoadingOverlay isActive={true} spinner text="Connecting with Stripe..." />
	) : (
		<Fragment></Fragment>
	);
};

export default StripeCancel;
