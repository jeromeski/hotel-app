import axios from "axios";
import { getToken } from "./get-token";

const _http = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 30000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

// Change request data/error here
_http.interceptors.request.use(
	(config) => {
		const token = getToken();
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

export default _http;
