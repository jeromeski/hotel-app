import React, { Fragment, useState } from "react";
import { useAuthContext } from "context/Auth";
import HotelForm from "components/form/hotel/HotelForm";
import { useCreateHotelMutation } from "framework/basic-rest/hotel/use-hotel";

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

function NewHotel() {
	const { state } = useAuthContext();
	const { auth } = state;
	const { user } = auth;
	const [values, setValues] = useState(initialState);

	const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

	const { mutate: createHotel, isLoading, isSuccess } = useCreateHotelMutation();
	const { title, content, image, price, location, from, to, bed } = values;

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			let hotelData = new FormData();
			hotelData.append("title", title);
			hotelData.append("content", content);
			hotelData.append("location", location);
			hotelData.append("price", price);
			image && hotelData.append("image", image);
			hotelData.append("from", from);
			hotelData.append("to", to);
			hotelData.append("bed", bed);

			createHotel(hotelData);
		} catch (error) {
			console.log(error);
		}
	};

	const handleImageChange = (e) => {
		setPreview(URL.createObjectURL(e.target.files[0]));
		setValues({ ...values, image: e.target.files[0] });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
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
											values={values}
											setValues={setValues}
											handleChange={handleChange}
											handleImageChange={handleImageChange}
											onSubmit={onSubmit}
											isLoading={isLoading}
											isSuccess={isSuccess}
											initialState={initialState}
										/>
									</div>
									<div className="col-md-4">
										<div className="img-wrapper">
											<img className="img" src={preview} alt="preview_image" />
										</div>
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
