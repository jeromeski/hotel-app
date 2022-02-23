import { useAuthContext } from "context/Auth";
import React, { Fragment, useEffect, useState } from "react";
// import buttonStyles from "assets/css/button-styles.module.css";
import LinkButton from "components/common/LinkButton";
import HotelsResourceLoader from "components/hotels/HotelsResourceLoader";
import { useHotelBookingsMutation } from "framework/basic-rest/hotel/use-hotel";
import BookedCard from "components/hotels/BookedCard";

function DashboardUser() {
	const { state } = useAuthContext();
	const { auth } = state;
	const [hotels, setHotels] = useState(null);
	const [show, setShow] = useState(false);

	const {
		mutate: onUserHotelBookings,
		data,
		isLoading,
		isSuccess,
		isError
	} = useHotelBookingsMutation();

	useEffect(() => {
		onUserHotelBookings();
	}, []);

	useEffect(() => {
		if (data) {
			setHotels(data.data);
		}
	}, [data]);

	console.log(show);

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-10 mt-5">
						<h2>Hotels</h2>
						<div className="container">
							<div className="row">
								{hotels && (
									<HotelsResourceLoader
										itemComponent={BookedCard}
										resourceName="hotel"
										hotels={hotels}
										owner={false}
										show={show}
										setShow={setShow}
									/>
								)}
							</div>
						</div>
					</div>
					<div className="col-md-2 mt-5">
						<LinkButton to="/">Browse Hotels</LinkButton>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default DashboardUser;
