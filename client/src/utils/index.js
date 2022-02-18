import shuffle from "lodash/shuffle";
import { LoremIpsum } from "lorem-ipsum";

export const updateUserInLocalStorage = (user) => {
	if (window.localStorage.getItem("auth")) {
		let auth = JSON.parse(localStorage.getItem("auth"));
		auth.user = user;
		localStorage.setItem("auth", JSON.stringify(auth));
	}
};

export const currencyFormatter = (data) => {
	return (data.amount / 100).toLocaleString(data.currency, {
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