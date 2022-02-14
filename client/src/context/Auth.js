import { createContext, useContext, useReducer, useMemo } from "react";
import { initializer } from "utils/initializer";

import authReducer from "./authReducer";

const Context = createContext();

Context.displayName = "AuthContext";

export const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initializer());

	console.log(state);

	const login = (payload) => {
		dispatch({
			type: "LOGIN_USER",
			payload
		});
	};

	const logout = (payload) => {
		dispatch({
			type: "LOGOUT",
			payload
		});
	};

	const register = (payload) => {
		dispatch({
			type: "REGISTER_USER",
			payload
		});
	};

	const value = useMemo(() => ({ state, login, logout, register }), [state]);

	return <Context.Provider value={value} {...props} />;
};

export function useAuthContext() {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error(`useUser must be used within a UserProvider`);
	}
	return context;
}
