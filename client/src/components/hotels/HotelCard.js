import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import slugify from "slugify";
import cardStyles from "assets/css/card-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";
import { currencyFormatter, diffDays } from "utils";

const HotelCard = ({ hotel, owner }) => {
	const history = useHistory();
	console.log(hotel);
	return hotel ? (
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
					{`${hotel.content.substring(0, 100)}... `}{" "}
					<Link to={`/hotel/${hotel._id}`}>Show More</Link>
				</p>
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
					<button
						type="button"
						className={buttonStyles.button}
						onClick={() => history.push(`/hotel/${hotel._id}`)}>
						Show More
					</button>
					{owner && (
						<Fragment>
							<button
								type="button"
								className={buttonStyles.button}
								onClick={() => history.push(`/hotel/edit/${hotel._id}`)}>
								Edit
							</button>
							<button type="button" className={buttonStyles.button} onClick={() => {}}>
								Delete
							</button>
						</Fragment>
					)}
				</div>
			</CardFooter>
		</Card>
	) : (
		<Fragment></Fragment>
	);
};

export default HotelCard;
