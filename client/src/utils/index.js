export const updateUserInLocalStorage = (user) => {
	if (window.localStorage.getItem("auth")) {
		let auth = JSON.parse(localStorage.getItem("auth"));
		auth.user = user;
		localStorage.setItem("auth", JSON.stringify(auth));
	}
};
