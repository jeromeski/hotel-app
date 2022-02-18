import React, { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "context/Auth";
import HotelForm from "components/form/hotel/HotelForm";
import { useCreateHotelMutation } from "framework/basic-rest/hotel/use-hotel";

const heightFull = {
	height: "100vh"
};

const initialValues = null;

function NewHotel() {
	const { state } = useAuthContext();
	const { auth: user } = state;
	const [values, setValues] = useState(initialValues);
	const [isHotel, setIsHotel] = useState(false);
	const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

	const { mutate: createHotel, isLoading, isSuccess, isError } = useCreateHotelMutation();

	const onSubmit = (data) => {
		setValues(data);
	};

	useEffect(() => {
		if (values) {
			const { title, content, image, price, location, from, to, bed } = values;
			let hotelData = new FormData();
			hotelData.append("title", title);
			hotelData.append("content", content);
			hotelData.append("location", location);
			hotelData.append("price", price);
			image && hotelData.append("image", image);
			hotelData.append("from", from);
			hotelData.append("to", to);
			hotelData.append("bed", bed);
			console.log("Hotel data ==>", [...hotelData]);
			setIsHotel(true);
			if (isHotel) {
				createHotel(hotelData);
			}
		}
	}, [values]);

	useEffect(() => {
		if (isSuccess) {
			setValues(initialValues);
			setPreview("https://via.placeholder.com/100x100.png?text=PREVIEW");
		}
	}, [isSuccess]);

	const handleImageChange = (e) => {
		setPreview(URL.createObjectURL(e.target.files[0]));
	};

	console.log("Values state ==>", values);

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
											onSubmit={onSubmit}
											isLoading={isLoading}
											isSuccess={isSuccess}
											isError={isError}
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
