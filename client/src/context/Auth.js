import useLocalStorage from "react-use/lib/useLocalStorage";
import { initializer } from "utils/initializer";

import authReducer, { initialState } from "./authReducer";

const { createContext, useContext, useMemo, useReducer, useEffect } = require("react");

const Context = createContext();

Context.displayName = "AuthContext";

export const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, JSON.parse(initializer(initialState, "auth")));
	const [auth, setAuth] = useLocalStorage("auth", {});
	console.log("current auth state ==> ", state);
	console.log("localstorage ==> ", auth);
	useEffect(() => {
		if (state) {
			setAuth(state.auth);
		}
	}, [state, setAuth]);

	const login = (payload) => {
		dispatch({
			type: "LOGIN_USER",
			payload
		});
	};

	const logout = () => {
		dispatch({
			type: "LOGOUT"
		});
	};

	const register = (payload) => {
		dispatch({
			type: "REGISTER_USER",
			payload
		});
	};

	const value = useMemo(() => ({ ...state, login, logout, register }), [state]);
	return <Context.Provider value={value} {...props} />;
};

export function useAuthContext() {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error(`useUser must be used within a UserProvider`);
	}
	return context;
}
