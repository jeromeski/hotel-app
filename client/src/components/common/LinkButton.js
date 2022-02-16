import React from "react";
import { withRouter } from "react-router-dom";
import buttonStyles from "assets/css/button-styles.module.css";

function LinkButton({ history, location, match, staticContext, to, onClick, ...rest }) {
	return (
		<button
			className={buttonStyles.button}
			{...rest}
			onClick={(event) => {
				onClick && onClick(event);
				history.push(to);
			}}
		/>
	);
}

export default withRouter(LinkButton);
