import React, { Fragment, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { getAddress, getLoremipsum } from "utils";
import addresses from "data/address.js";
import formStyles from "assets/css/form-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";
import moment from "moment";

// const { RangePicker } = DatePicker;

// function RangePickerAntd({ control, name, errors }) {
// 	const [fromDate, setFromDate] = useState(null);
// 	const [toDate, setToDate] = useState(null);

//   console.log(errors);
// 	const {
// 		field: { onChange, ref }
// 	} = useController({ control, name });

// 	const filterByDate = (dates) => {
// 		setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
// 		setToDate(moment(dates[1]).format("DD-MM-YYYY"));
// 	};

// 	const handlePicker = (dates) => {
// 		filterByDate(dates);
// 	};

// 	useEffect(() => {
// 		if (fromDate && toDate) {
// 			onChange({ from: fromDate, to: toDate });
// 		}
// 	}, [fromDate, toDate]);

// 	return (
// 		<Fragment>
// 			<RangePicker
// 				name={name}
// 				format="DD-MM-YYYY"
// 				onChange={(dates) => {
// 					handlePicker(dates);
// 				}}
// 				inputRef={ref}
// 			/>
// 			<ErrorMessage errors={errors} name={name} />
// 		</Fragment>
// 	);
// }

export default function HotelForm({ handleImageChange, preview, onSubmit, isLoading, isSuccess }) {
	const [address, setAddress] = useState("");
	const [lorem, setLorem] = useState("");

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		reset,
		isError
	} = useForm();

	useEffect(() => {
		if (address === "") {
			getAddress(setAddress, addresses);
			getLoremipsum(setLorem, lorem);
		}
	}, []);

	useEffect(() => {
		if (isSuccess) {
			getAddress(setAddress, addresses);
			getLoremipsum(setLorem, lorem);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isSuccess) {
			reset();
		}
		reset();
	}, [reset, isSuccess]);

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
						value={lorem}
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

				<label className={formStyles.label}>
					<Controller
						control={control}
						name="from"
						rules={{ required: "This field is required" }}
						render={({ field, formState }) => {
							const { ref, ...rest } = field;
							const { errors } = formState;

							return (
								<Fragment>
									<DatePicker
										format="DD-MM-YYYY"
										inputRef={ref}
										{...rest}
										disabledDate={(current) =>
											current && current.valueOf() < moment().subtract(1, "days")
										}
									/>
									<ErrorMessage errors={errors} name="from" />
								</Fragment>
							);
						}}
					/>
				</label>

				<label className={formStyles.label}>
					<Controller
						control={control}
						name="to"
						rules={{ required: "This field is required" }}
						render={({ field, formState }) => {
							const { ref } = field;
							const { errors } = formState;
							return (
								<Fragment>
									<DatePicker
										inputRef={ref}
										{...field}
										disabledDate={(current) =>
											current && current.valueOf() < moment().subtract(1, "days")
										}
									/>
									<ErrorMessage errors={errors} name="to" />
								</Fragment>
							);
						}}
					/>
				</label>

				<label className={formStyles.label}>
					<button className={buttonStyles.button} type="submit" disabled={isLoading ? 1 : 0}>
						{isLoading ? "Loading..." : "Submit"}
					</button>
					<button
						className={buttonStyles.button}
						type="button"
						onClick={() => {
							reset(
								{
									title: "",
									content: "",
									location: "",
									image: "",
									price: "",
									from: "",
									to: "",
									bed: ""
								},
								{
									keepErrors: true,
									keepDirty: true,
									keepIsSubmitted: false,
									keepTouched: false,
									keepIsValid: false,
									keepSubmitCount: false
								}
							);
						}}>
						Reset
					</button>
				</label>
			</form>
		</Fragment>
	);
}

/*

*/ 