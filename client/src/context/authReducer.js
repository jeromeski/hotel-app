export const initialState = null;

export default function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN_USER":
			return {
        ...state,
				auth: action.payload
			};

		case "LOGOUT":
			return {
        ...state,
				auth: action.payload
			};

		case "REGISTER_USER":
			return {
        ...state,
        ...action.payload
      };
		default:
			return state;
	}
}
