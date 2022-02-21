export const getToken = () => {
	if (window.localStorage.getItem("auth") === null) {
		return null;
	}

	const token = Object.values(JSON.parse(window.localStorage.auth))[0];
	return token;
};
