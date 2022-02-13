import React, { cloneElement } from "react";
import { Children } from "react/cjs/react.production.min";

function RegisterForm({ handleSubmit, onSubmit, children }) {
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form mt-5">
			{Children.toArray(children).map((child) => cloneElement(child))}
		</form>
	);
}

export default RegisterForm;
