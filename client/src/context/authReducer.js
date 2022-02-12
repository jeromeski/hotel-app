export const initialState = { user: { name: "Ryan", role: "admin" } };

export default function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN_USER":
			return {
				...state,
				...action.payload
			};

		case "LOGOUT":
			return {
				...action.payload
			};
		default:
			return state;
	}
}
