import { initializer } from "utils";
import authReducer, { initialState } from "./authReducer";

const { createContext, useContext, useMemo, useReducer } = require("react");

const Context = createContext();

Context.displayName = "AuthContext";

export function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initializer(initialState, "auth"));

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

	const value = useMemo(() => ({ ...state, login, logout, register }), [state]);
	return <Context.Provider value={value} {...props} />;
}

export function useAuthContext() {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error(`useUser must be used within a UserProvider`);
	}
	return context;
}
