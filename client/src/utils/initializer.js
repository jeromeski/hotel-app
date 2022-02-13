export const initializer = (initialState, name) => {
	const item = localStorage.getItem(`${name}`);
	if (item) {
		return item;
	}

	return JSON.stringify(initialState);
};
