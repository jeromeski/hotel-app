import moment from "moment";
import React from "react";
import slugify from "slugify";
import { currencyFormatter } from "utils";

function HotelsResourceLoader({ hotels, itemComponent: Component }) {
	return hotels?.map((hotel) => (
		<div className="col-md-4" key={hotel._id}>
			<Component
				photos={["https://via.placeholder.com/430x300"]}
				price={
					<div>
						{currencyFormatter({ amount: hotel.price, currency: "usd" })} <small>/night</small>
					</div>
				}
				productName={hotel.title}
				description={
					<div>
						<span>{`${hotel.location}`}</span>
						<span style={{ display: "block" }}>Beds: {hotel.bed}</span>
						<span style={{ display: "block" }}>
							Availability: {new Date(hotel.from).toLocaleDateString()} -{" "}
							{new Date(hotel.to).toLocaleDateString()}
						</span>
					</div>
				}
				buttonText="View more"
				url={`/hotel/${slugify(hotel.title.toLowerCase())}`}
				className="hotel-card"
			/>
		</div>
	));
}

export default HotelsResourceLoader;
