import axios from "axios";
// import { getToken } from "./get-token";

const _http = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

const _httpStripe = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

const _httpHotel = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

// Change request data/error here
_httpStripe.interceptors.request.use(
	(config) => {
		const token = Object.values(JSON.parse(window.localStorage.auth))[0];
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token ? token : ""}`
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

_httpHotel.interceptors.request.use(
	(config) => {
		const token = Object.values(JSON.parse(window.localStorage.auth))[0];
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token ? token : ""}`
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { _httpStripe };
export { _httpHotel };
export default _http;