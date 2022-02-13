export const initialState = { auth: null };

export default function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN_USER":
			return {
				auth: action.payload
			};

		case "LOGOUT":
			return {
				auth: null
			};

		case "REGISTER_USER":
			return {};
		default:
			return state;
	}
}
