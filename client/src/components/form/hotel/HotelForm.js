import React, { Fragment, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { getAddress, getLoremipsum } from "utils";
import addresses from "data/address.js";
import formStyles from "assets/css/form-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";
import moment from "moment";

export default function HotelForm({
	handleImageChange,
	handleChange,
	onSubmit,
	isLoading,
	isSuccess,
	setValues,
	values,
	initialState
}) {
	const [address, setAddress] = useState("");
	const [lorem, setLorem] = useState("");

	useEffect(() => {
		getLoremipsum(setLorem, lorem);
		getAddress(setAddress, addresses);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setValues(initialState);
			const timer = setTimeout(() => {
				window.location.reload();
				clearTimeout(timer);
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleReset = () => {
		setValues(initialState);
		window.location.reload();
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit} className={formStyles.form}>
				<label className={formStyles.label}>
					<input type="file" accept="image/*" onChange={handleImageChange} name="image" />
				</label>
				<label className={formStyles.label}>
					<input
						name="title"
						type="text"
						placeholder="Title"
						className={formStyles.input}
						onChange={handleChange}
					/>
				</label>
				<label className={formStyles.label}>
					<textarea
						name="content"
						// value={lorem ? lorem : ""}
						// readOnly={true}
						defaultValue={lorem ? lorem : ""}
						placeholder="Content"
						className={formStyles.textArea}
						onFocus={handleChange}
					/>
				</label>
				<label className={formStyles.label}>
					<input
						name="price"
						type="number"
						placeholder="Price"
						className={formStyles.input}
						onChange={handleChange}
					/>
				</label>
				<label className={formStyles.label}>
					<input
						name="location"
						defaultValue={address ? address : ""}
						// readOnly={true}
						placeholder={`${address.substring(0, 45)}...`}
						// onChange={handleChange}
						onFocus={handleChange}
						type="text"
						className={formStyles.input}
					/>
				</label>
				<label className={formStyles.label}>
					<input
						name="bed"
						type="number"
						placeholder="Number of Beds"
						className={formStyles.input}
						onChange={handleChange}
					/>
				</label>

				<label className={formStyles.label}>
					<DatePicker
						placeholder="From date"
						className="ant-picker"
						onChange={(date, dateString) => setValues({ ...values, from: dateString })}
						disabledDate={(current) => current && current.valueOf() < moment().subtract(1, "days")}
					/>
				</label>

				<label className={formStyles.label}>
					<DatePicker
						placeholder="To date"
						className="ant-picker"
						onChange={(date, dateString) => setValues({ ...values, to: dateString })}
						disabledDate={(current) => current && current.valueOf() < moment().subtract(1, "days")}
					/>
				</label>

				<label className={formStyles.label}>
					<button className={buttonStyles.button} type="submit" disabled={isLoading ? 1 : 0}>
						{isLoading ? "Loading..." : "Submit"}
					</button>
					<button className={buttonStyles.button} type="button" onClick={handleReset}>
						Reset
					</button>
				</label>
			</form>
		</Fragment>
	);
}

/*

*/ 