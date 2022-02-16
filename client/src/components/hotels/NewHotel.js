import React, { Fragment, useState } from "react";
import { useAuthContext } from "context/Auth";
import { HotelForm } from "components/form/hotel/HotelForm";

const heightFull = {
	height: "100vh"
};

function NewHotel() {
	const { state } = useAuthContext();
	const { auth: user } = state;
	const [values, setValues] = useState();
	const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

	const handleImageChange = (e) => {
		// console.log(e.target.files[0]);
		setPreview(URL.createObjectURL(e.target.files[0]));
		setValues({ ...values, image: e.target.files[0] });
	};

	return (
		user && (
			<Fragment>
				<div className="container-fluid">
					<div className="row" style={heightFull}>
						<div className="col-md-4 offset-md-4 d-flex align-items-center">
							<div className="container">
								<div className="row d-flex justify-content-center pb-5">
									<h2>Add Hotel</h2>
								</div>
								<div className="row">
									<div className="col-md-8">
										<HotelForm handleImageChange={handleImageChange} />
									</div>
									<div className="col-md-4">
										<img src={preview} alt="preview_image" />
										<pre></pre>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	);
}

export default NewHotel;

/*
{JSON.stringify(user, null, 4)}
*/
