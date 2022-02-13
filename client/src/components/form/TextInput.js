import React, { forwardRef, Fragment } from "react";
import VisuallyHidden from "@reach/visually-hidden";

export default forwardRef(function TextInput({ id, label, type = "text", ...rest }, ref) {
	return (
		<Fragment>
			<VisuallyHidden>
				<label htmlFor={id}>{label}</label>
			</VisuallyHidden>
			<input ref={ref} id={id} placeholder={label} type={type} {...rest} required />
		</Fragment>
	);
});
