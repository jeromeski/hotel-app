export const initializer = () => {
	let userState;
	if (window.localStorage.getItem("auth")) {
		userState = JSON.parse(window.localStorage.getItem("auth"));
		return { auth: userState };
	}
	userState = { auth: null };

	return userState;
};
