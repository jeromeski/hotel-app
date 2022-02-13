export const initialState = { auth: {} };

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
		default:
			return state;
	}
}
