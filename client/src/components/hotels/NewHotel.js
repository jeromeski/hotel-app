import React from "react";
import { useAuthContext } from "context/Auth";

function NewHotel() {
	const { state } = useAuthContext();
	const { auth: user } = state;

	return (
		user && (
			<div className="container-fluid h1 p-5">
				<pre>{JSON.stringify(user, null, 4)}</pre>
			</div>
		)
	);
}

export default NewHotel;
