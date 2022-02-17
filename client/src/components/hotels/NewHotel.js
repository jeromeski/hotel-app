import React, { Fragment, useState } from "react";
import { useAuthContext } from "context/Auth";
import { HotelForm } from "components/form/hotel/HotelForm";

const heightFull = {
	height: "100vh"
};

function NewHotel() {
	const { state } = useAuthContext();
	const { auth: user } = state;
	const [values, setValues] = useState({
		title: "",
		content: "",
		location: "",
		image: "",
		price: "",
		dates: "",
		bed: ""
	});
	const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

	const handleImageChange = (e) => {
		// console.log(e.target.files[0]);
		setPreview(URL.createObjectURL(e.target.files[0]));
	};

	return (
		user && (
			<Fragment>
				<div className="container-fluid">
					<div className="row" style={heightFull}>
						<div className="col-md-6 offset-md-3 d-flex align-items-center">
							<div className="container">
								<div className="row d-flex p-3">
									<h2 style={{ textDecoration: "underline" }}>
										<span>New Hotel</span>
									</h2>
								</div>

								<div className="row">
									<div className="col-md-8">
										<HotelForm
											handleImageChange={handleImageChange}
											setValues={setValues}
											preview={preview}
										/>
									</div>
									<div className="col-md-4">
										<div className="img-wrapper">
											<img className="img" src={preview} alt="preview_image" />
										</div>
										<code>{JSON.stringify(values, null, 4)}</code>
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
