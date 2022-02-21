import EditForm from "components/form/hotel/EditForm";
import { useReadHotelMutation, useUpdateHotelMutation } from "framework/basic-rest/hotel/use-hotel";
import React, { Fragment, useEffect, useState } from "react";

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

function EditHotel({ match }) {
	const [values, setValues] = useState(initialState);
	const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

	const {
		mutate: readHotel,
		data,
		isLoading: isLoading_read,
		isSuccess: isSuccess_read
	} = useReadHotelMutation();
	const {
		mutate: updateHotel,
		isLoading: isLoading_edit,
		isSuccess: isSuccess_edit
	} = useUpdateHotelMutation();

	// destructuring variables from state
	const { title, content, image, price, from, to, bed, location } = values;

	useEffect(() => {
		readHotel(match.params.hotelId);
	}, []);

	useEffect(() => {
		if (data) {
			if (data.data) {
				setValues({ ...values, ...data.data });
				setPreview(`${process.env.REACT_APP_BACKEND_URL}/hotel/image/${data.data._id}`);
			}
		}
	}, [data]);

	useEffect(() => {
		if (isSuccess_edit) {
			readHotel(match.params.hotelId);
		}
	}, [isSuccess_edit]);

	const onSubmit = (e) => {
		e.preventDefault();
		let hotelData = new FormData();
		hotelData.append("title", title);
		hotelData.append("content", content);
		hotelData.append("location", location);
		hotelData.append("price", price);
		image && hotelData.append("image", image);
		hotelData.append("from", from);
		hotelData.append("to", to);
		hotelData.append("bed", bed);
		console.log([...hotelData]);
		try {
			updateHotel({ input: hotelData, id: match.params.hotelId });
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
		<Fragment>
			<div className="container-fluid">
				<div className="row" style={heightFull}>
					<div className="col-md-6 offset-md-3 d-flex align-items-center">
						<div className="container">
							<div className="row d-flex p-3">
								<h2 style={{ textDecoration: "underline" }}>
									<span>Update Your Hotel</span>
								</h2>
							</div>
							<div className="row">
								<div className="col-md-8">
									{isLoading_read ? (
										<h1>Loading...</h1>
									) : data?.data ? (
										<EditForm
											handleImageChange={handleImageChange}
											handleChange={handleChange}
											onSubmit={onSubmit}
											isLoading={isLoading_edit}
											isSuccess={isSuccess_edit}
											setValues={setValues}
											values={values}
											initialState={initialState}
										/>
									) : (
										<Fragment></Fragment>
									)}
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
	);
}

export default EditHotel;
