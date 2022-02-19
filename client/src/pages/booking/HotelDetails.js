import React from "react";
import { useParams } from "react-router-dom";

function HotelDetails() {
	const params = useParams();
	console.log(params);
	return <div>Hotel</div>;
}

export default HotelDetails;
