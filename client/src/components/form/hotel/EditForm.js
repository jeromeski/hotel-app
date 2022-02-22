import React, { Fragment } from "react";
import formStyles from "assets/css/form-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";
import { DatePicker } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";

function EditForm({
	initialState,
	setValues,
	values: hotel,
	handleImageChange,
	handleChange,
	isLoading,
	onSubmit
}) {
	const history = useHistory();

	const handleReset = () => {
		setValues(initialState);
		window.location.reload();
	};

	console.log("edit form :", hotel);

	return (
		<Fragment>
			{hotel && (
				<form onSubmit={onSubmit} className={formStyles.form}>
					<label className={formStyles.label}>
						<input type="file" accept="image/*" onChange={handleImageChange} name="image" />
					</label>
					<label className={formStyles.label}>
						<input
							name="title"
							type="text"
							placeholder={hotel.title}
							defaultValue={hotel.title}
							className={formStyles.input}
							onChange={handleChange}
						/>
					</label>
					<label className={formStyles.label}>
						<textarea
							name="content"
							// value={lorem ? lorem : ""}
							// readOnly={true}
							defaultValue={hotel.content}
							placeholder="Content"
							className={formStyles.textArea}
							onFocus={handleChange}
							onChange={handleChange}
						/>
					</label>
					<label className={formStyles.label}>
						<input
							name="price"
							type="number"
							defaultValue={hotel.price}
							placeholder="Price"
							className={formStyles.input}
							onChange={handleChange}
						/>
					</label>
					<label className={formStyles.label}>
						<input
							name="location"
							defaultValue={hotel.location}
							// readOnly={true}
							placeholder={`${hotel.location}...`}
							// onChange={handleChange}
							onFocus={handleChange}
							onChange={handleChange}
							type="text"
							className={formStyles.input}
						/>
					</label>
					<label className={formStyles.label}>
						<input
							name="bed"
							type="number"
							placeholder="Number of Beds"
							defaultValue={hotel.bed}
							className={formStyles.input}
							onFocus={handleChange}
							onChange={handleChange}
						/>
					</label>

					<label className={formStyles.label}>
						<DatePicker
							placeholder={moment(hotel.from).format("DD-MM-YYYY")}
							className="ant-picker"
							onChange={(date, dateString) => setValues({ ...hotel, from: dateString })}
							disabledDate={(current) =>
								current && current.valueOf() < moment().subtract(1, "days")
							}
							// defaultValue={hotel.from}
							defaultPickerValue={moment(hotel.from)}
						/>
					</label>

					<label className={formStyles.label}>
						<DatePicker
							placeholder={moment(hotel.to).format("DD-MM-YYYY")}
							className="ant-picker"
							onChange={(date, dateString) => setValues({ ...hotel, to: dateString })}
							disabledDate={(current) =>
								current && current.valueOf() < moment().subtract(1, "days")
							}
							// defaultValue={hotel.to}
							defaultPickerValue={moment(hotel.to)}
						/>
					</label>

					<div className="mt-3 d-flex justify-content-between">
						<div>
							<button className={buttonStyles.button} type="submit" disabled={isLoading ? 1 : 0}>
								{isLoading ? "Loading..." : "Submit"}
							</button>
							<button className={buttonStyles.button} type="button" onClick={handleReset}>
								Reset
							</button>
						</div>
						<button
							className={buttonStyles.button}
							type="button"
							onClick={() => history.push("/dashboard")}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</Fragment>
	);
}

export default EditForm;
