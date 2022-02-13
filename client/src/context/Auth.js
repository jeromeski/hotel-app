import { createContext, useContext, useReducer, useEffect } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { initializer } from "utils/initializer";

import authReducer, { initialState } from "./authReducer";

const Context = createContext();

Context.displayName = "AuthContext";

export const AuthProvider = (props) => {
	const [{ auth }, dispatch] = useReducer(
		authReducer,
		JSON.parse(initializer(initialState, "auth"))
	);
	const [authStore, setAuthStore] = useLocalStorage("auth", {});
	console.log("localstorage ==> ", authStore);
	useEffect(() => {
		if (auth) {
			setAuthStore(auth);
		} else {
			setAuthStore(null);
		}
	}, [auth, setAuthStore]);

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

	const register = () => {
		dispatch({
			type: "REGISTER_USER"
		});
	};

	const value = { auth, login, logout, register };
	console.log(value);
	return <Context.Provider value={value} {...props} />;
};

export function useAuthContext() {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error(`useUser must be used within a UserProvider`);
	}
	return context;
}
