import { useAuthContext } from "context/Auth";
import { useStripeConnectMutation } from "framework/basic-rest/auth/use-stripe";
import React, { Fragment, useEffect, useState } from "react";
import buttonStyles from "assets/css/button-styles.module.css";
import LinkButton from "components/common/LinkButton";
import HotelsResourceLoader from "components/hotels/HotelsResourceLoader";
import HotelCard from "components/hotels/HotelCard";
import { useGetSellerHotelsMutation } from "framework/basic-rest/hotel/use-hotel";

function DashboardSeller() {
	const { state } = useAuthContext();
	const { auth } = state;
	const [hotels, setHotels] = useState(null);

	const { mutate: connectAccount, isLoading, isError } = useStripeConnectMutation();
	const {
		mutate: getSellerHotels,
		isLoading: _isLoading,
		isSuccess: _isSuccess,
		data
	} = useGetSellerHotelsMutation();

	const handleClick = () => {
		connectAccount();
	};

	useEffect(() => {
		getSellerHotels();
	}, []);

	useEffect(() => {
		if (data) {
			setHotels(data.data);
		}
	}, [data]);

	const connected = () => (
		<div className="container">
			<div className="row">
				<div className="col-md-10 mt-5">
					<h2>Hotels</h2>
					<div className="container">
						<div className="row">
							{_isLoading && <h1>Loading...</h1>}
							{hotels && (
								<HotelsResourceLoader
									itemComponent={HotelCard}
									resourceName="hotel"
									hotels={hotels}
									owner={true}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="col-md-2 mt-5">
					<LinkButton to="/hotels/new">Add Hotels +</LinkButton>
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
						<button className={buttonStyles.button} type="button" onClick={handleClick}>
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
