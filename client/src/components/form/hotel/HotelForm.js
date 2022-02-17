import React, { Fragment, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { useController, useForm } from "react-hook-form";
import moment from "moment";
import { ErrorMessage } from "@hookform/error-message";
import { getAddress } from "utils";
import addresses from "data/address.js";
import formStyles from "assets/css/form-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";

const { RangePicker } = DatePicker;

function RangePickerAntd({ control, name, errors }) {
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);

	const {
		field: { onChange, ref }
	} = useController({ control, name, rules: { required: true } });

	const filterByDate = (dates) => {
		setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
		setToDate(moment(dates[1]).format("DD-MM-YYYY"));
	};

	const handlePicker = (dates) => {
		filterByDate(dates);
	};

	useEffect(() => {
		if (fromDate && toDate) {
			onChange({ from: fromDate, to: toDate });
		}
	}, [fromDate, toDate]);

	return (
		<Fragment>
			<RangePicker
				name={name}
				format="DD-MM-YYYY"
				onChange={(dates) => {
					handlePicker(dates);
				}}
				inputRef={ref}
			/>
			<ErrorMessage errors={errors} name={name} />
		</Fragment>
	);
}

export function HotelForm({ handleImageChange, setValues, preview }) {
	const [address, setAddress] = useState("");
	const {
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = useForm();

	useEffect(() => {
		getAddress(setAddress, addresses);
	}, []);

	const onSubmit = (data) => {
		setValues(data);
	};

	return (
		<Fragment>
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				<label className={formStyles.label}>
					<input
						type="file"
						accept="image/*"
						{...register("image", {
							onChange: (e) => {
								handleImageChange(e);
								return preview;
							},
							required: "This field is required"
						})}
					/>
					<ErrorMessage errors={errors} name="image" />
				</label>
				<label className={formStyles.label}>
					<input
						type="text"
						placeholder="Title"
						{...register("title", { required: "This field is required" })}
						className={formStyles.input}
					/>
					<ErrorMessage errors={errors} name="title" />
				</label>
				<label className={formStyles.label}>
					<textarea
						placeholder="Content"
						{...register("content", { required: "This field is required" })}
						className={formStyles.textArea}
					/>
					<ErrorMessage errors={errors} name="content" />
				</label>
				<label className={formStyles.label}>
					<input
						type="number"
						placeholder="Price"
						{...register("price", { required: "This field is required" })}
						className={formStyles.input}
					/>
					<ErrorMessage errors={errors} name="price" />
				</label>
				<label className={formStyles.label}>
					<input
						value={address}
						placeholder={`${address.substring(0, 45)}...`}
						type="text"
						{...register("location", {
							required: "This field is required"
							// disabled: true
						})}
						className={formStyles.input}
					/>
					<ErrorMessage errors={errors} name="location" />
				</label>
				<label className={formStyles.label}>
					<input
						type="number"
						placeholder="Number of Beds"
						{...register("bed", { required: "This field is required" })}
						className={formStyles.input}
					/>
					<ErrorMessage errors={errors} name="bed" />
				</label>

				<div>
					<RangePickerAntd
						control={control}
						name="dates"
						style={{ width: "100% !important", marginTop: "1rem" }}
						errors={errors}
					/>
				</div>

				<label className={formStyles.label}>
					<button className={buttonStyles.button} type="submit">
						Submit
					</button>
				</label>
			</form>
		</Fragment>
	);
}
