import { useAuthContext } from "context/Auth";
import {
	useIsAlreadyBookedMutation,
	useReadHotelMutation
} from "framework/basic-rest/hotel/use-hotel";
import { useStripeSessionMutation } from "framework/basic-rest/stripe/use-stripe";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import React, { Fragment, useEffect, useState } from "react";
import { diffDays } from "utils";
import buttonStyles from "assets/css/button-styles.module.css";
import LoadingOverlay from "components/common/LoadingOverlay";

const heightFull = {
	height: "100vh"
};

const initialState = {
	title: "",
	content: "",
	image: "",
	price: "",
	from: "",
	to: "",
	bed: ""
};

function ViewHotel({ match }) {
	const { state } = useAuthContext();
	const { auth } = state;
	const [hotel, setHotel] = useState(initialState);
	const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");
	const [alreadyBooked, setAlreadyBooked] = useState(false);

	const { mutate: readHotel, data } = useReadHotelMutation();
	const { mutate: getSessionId, data: res, isLoading, isSuccess } = useStripeSessionMutation();
	const { mutate: isAlreadyBooked, data: res_booked } = useIsAlreadyBookedMutation();

	useEffect(() => {
		readHotel(match.params.hotelId);
	}, []);

	useEffect(() => {
		if (data) {
			if (data.data) {
				setHotel(data.data);
				setPreview(`${process.env.REACT_APP_BACKEND_URL}/hotel/image/${data.data._id}`);
			}
		}
	}, [data]);

	const handleClick = () => {
		getSessionId(match.params.hotelId);
	};

	useEffect(() => {
		if (auth && auth.token) {
			isAlreadyBooked(match.params.hotelId);
		}
	}, [auth, auth.token]);

	useEffect(() => {
		if (res_booked) {
			if (res_booked.data.ok) {
				setAlreadyBooked(true);
			}
		}
	}, [res_booked]);

	useEffect(() => {
		if (res) {
			try {
				(async () => {
					let stripe = "";
					stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
					stripe.redirectToCheckout({
						sessionId: res.data.sessionId
					});
				})();
			} catch (error) {
				console.log(error);
			}
		}
	}, [res]);

	return (
		<Fragment>
			<div className="container-fluid">
				<div className="row" style={heightFull}>
					<div className="col-md-8 offset-md-2 d-flex align-items-center">
						<div className="container">
							<div className="row">
								<div className="col-md-6">
									<img src={preview} alt={hotel.title} className="img img-fluid m-2" />
									<h1 className="pl-1 text-secondary">{hotel.title}</h1>
									<p className="pl-1 text-muted">{hotel.location}</p>
									<p className="card-text">
										<span className="text-primary">
											Available for {diffDays(hotel.from, hotel.to)}{" "}
											{diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
										</span>
									</p>
								</div>
								<div className="col-md-6">
									<p>{hotel.content}</p>
									<p className="mt-3">Price : ${hotel.price}</p>
									<p>From : {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}</p>
									<p>To : {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}</p>
									<i>Posted by : {hotel.postedBy && hotel.postedBy.name}</i>
									<br />
									<button
										type="button"
										onClick={handleClick}
										className={`${buttonStyles.button} mt-3`}
										disabled={alreadyBooked}>
										{alreadyBooked
											? "Already Booked"
											: auth && auth.token
											? "Book Now"
											: "Login to Book"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLoading && !isSuccess ? (
				<LoadingOverlay isActive={true} spinner text="Loading Hotel" />
			) : (
				<Fragment></Fragment>
			)}
		</Fragment>
	);
}

export default ViewHotel;
