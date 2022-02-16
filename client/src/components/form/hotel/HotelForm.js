import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import formStyles from "assets/css/form-styles.module.css";
import buttonStyles from "assets/css/button-styles.module.css";

export function HotelForm({ handleImageChange, setValues }) {
	const { handleSubmit, register } = useForm({
		defaultValues: {
			title: "",
			image: "",
			content: "",
			price: "",
			bed: ""
		}
	});

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
						{...register("image", { onChange: (e) => handleImageChange(e) })}
					/>
				</label>
				<label className={formStyles.label}>
					<input
						type="text"
						placeholder="Title"
						{...register("title")}
						className={formStyles.input}
					/>
				</label>
				<label className={formStyles.label}>
					<textarea
						placeholder="Content"
						{...register("content")}
						className={formStyles.textArea}
					/>
				</label>
				<label className={formStyles.label}>
					<input
						type="number"
						placeholder="Price"
						{...register("price")}
						className={formStyles.input}
					/>
				</label>
				<label className={formStyles.label}>
					<input
						type="number"
						placeholder="Number of Beds"
						{...register("bed")}
						className={formStyles.input}
					/>
				</label>
				<label className={formStyles.label}>
					<button className={buttonStyles.button} type="submit">
						Submit
					</button>
				</label>
			</form>
		</Fragment>
	);
}
