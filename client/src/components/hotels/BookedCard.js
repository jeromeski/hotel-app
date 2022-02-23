import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import slugify from "slugify";
import cardStyles from "assets/css/card-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";
import { currencyFormatter, diffDays } from "utils";
import Modal from "components/common/Modal";

const BookedCard = ({ hotel: { hotel, session, orderedBy }, show, setShow }) => {
	console.log(hotel);
	return (
		hotel && (
			<Fragment>
				<Card>
					<CardHeader>
						<div className={cardStyles.thumbnail}>
							<Link to={`/hotel/${hotel._id}`}>
								{hotel.image && hotel.image.contentType ? (
									<img
										src={`${process.env.REACT_APP_BACKEND_URL}/hotel/image/${hotel._id}`}
										alt={`${slugify(hotel.title)}`}
										className="card-image img img-fluid"
									/>
								) : (
									<img
										src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
										alt={`${slugify(hotel.title)}`}
										className="card-image img img-fluid"
									/>
								)}
							</Link>
						</div>
						<span className={cardStyles.price}>
							{currencyFormatter({ amount: hotel.price, currency: "usd" })}
						</span>
					</CardHeader>
					<CardBody>
						<h1 className={`${cardStyles.title}`}>{hotel.title}</h1>
						<p className="text-muted">{hotel.location}</p>
						<p className="text-muted">
							<b>Beds :</b> {hotel.bed}
						</p>
						<p className="text-muted">
							<b>Availability :</b> {new Date(hotel.from).toLocaleDateString()} to{" "}
							{new Date(hotel.to).toLocaleDateString()}
						</p>
						<p>
							<span className="text-primary">
								for {diffDays(hotel.from, hotel.to)}{" "}
								{diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"} only.
							</span>
						</p>
					</CardBody>
					<CardFooter>
						<div className="d-flex justify-content-between">
							<button type="button" className={buttonStyles.button} onClick={() => setShow(true)}>
								Show Payment Info
							</button>
						</div>
					</CardFooter>
				</Card>
				<Modal
					show={show}
					setShow={setShow}
					hotel={hotel}
					session={session}
					orderedBy={orderedBy}
				/>
			</Fragment>
		)
	);
};

export default BookedCard;
