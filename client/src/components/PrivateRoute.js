import { useAuthContext } from "context/Auth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ ...rest }) {
	const { state } = useAuthContext();
	return state.auth && state.auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
