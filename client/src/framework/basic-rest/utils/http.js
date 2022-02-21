import axios from "axios";
import { getToken } from "./get-token";
// import { getToken } from "./get-token";

const http_auth = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

const http_stripe = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

const http_hotel = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

// getToken()
// Change request data/error here

http_auth.interceptors.request.use(
	async (config) => {
		const token = await getToken();
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

// Change request data/error here
http_stripe.interceptors.request.use(
	async (config) => {
		const token = await getToken();
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

http_hotel.interceptors.request.use(
	async (config) => {
		const token = await getToken();
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

export { http_stripe };
export { http_hotel };
export default http_auth;

