import shuffle from "lodash/shuffle";
import { LoremIpsum } from "lorem-ipsum";

export const updateUserInLocalStorage = (user, next) => {
	if (window.localStorage.getItem("auth")) {
		let auth = JSON.parse(localStorage.getItem("auth"));
		auth.user = user;
		localStorage.setItem("auth", JSON.stringify(auth));
		next();
	}
};
export const currencyFormatter = (data) => {
	return data.amount.toLocaleString(data.currency, {
		style: "currency",
		currency: data.currency
	});
};

export function getAddress(setAddress, addresses) {
	const newAddress = shuffle(addresses())[0];
	const arr = Object.entries(newAddress);
	let newArr = arr
		.filter(([key, value], idx) =>
			key === "streetAddress" || key === "city" || key === "country" || key === "zipCode"
				? value
				: false
		)
		.map(([key, value]) => value);
	const [zipCode, city, streetAddress, ...rest] = newArr;
	newArr = [streetAddress, city, ...rest, zipCode];
	setAddress(newArr.join(", "));
}

export function getLoremipsum(setLorem) {
	const lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 14,
			min: 10
		},
		wordsPerSentence: {
			max: 16,
			min: 8
		}
	});

	setLorem(lorem.generateParagraphs(1));
}

export const diffDays = (from, to) => {
	const day = 24 * 60 * 60 * 1000;
	const start = new Date(from);
	const end = new Date(to);
	const difference = Math.round(Math.abs((start - end) / day));
	return difference;
};

export const initializer = () => {
	let userState;
	if (window.localStorage.getItem("auth")) {
		userState = JSON.parse(window.localStorage.getItem("auth"));
		return { auth: userState };
	}
	userState = { auth: null };

	return userState;
};

