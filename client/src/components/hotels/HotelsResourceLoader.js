import React from "react";
import slugify from "slugify";
import { currencyFormatter } from "utils";

function HotelsResourceLoader({ hotels, itemComponent: Component }) {
	return hotels?.map((hotel) => (
		<div className="col-md-4" key={hotel._id}>
			<Component
				photos={["https://via.placeholder.com/430x300"]}
				price={`${currencyFormatter({ amount: hotel.price, currency: "usd" })}`}
				productName={hotel.title}
				description={`${hotel.content.substring(0, 40)}...`}
				buttonText="View more"
				url={`/hotel/${slugify(hotel.title)}`}
				className="hotel-card"
			/>
		</div>
	));
}

export default HotelsResourceLoader;
