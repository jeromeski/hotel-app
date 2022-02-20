import React, { forwardRef, Fragment } from "react";
import formStyles from "assets/css/form-styles.module.css";

export default forwardRef(function TextInput({ id, label, type = "text", ...rest }, ref) {
	return (
		<Fragment>
			<label className={formStyles.label}>
				<input
					ref={ref}
					id={id}
					placeholder={label}
					type={type}
					{...rest}
					required
					className={formStyles.input}
				/>
			</label>
		</Fragment>
	);
});
