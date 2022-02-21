export const API_ENDPOINTS = {
	LOGIN: "/login",
	REGISTER: "/register",
	LOGOUT: "/logout",
	FORGET_PASSWORD: "/forget-password",
	STRIPE_CONNECT: "/connect-account",
	STRIPE_STATUS: "/account-status",
	STRIPE_BALANCE: "/account-balance",
	STRIPE_SETTINGS: "/payout-settings",
	STRIPE_SESSION: "/stripe-session-id",
	CREATE_HOTEL: "/create-hotel",
	HOTELS: "/hotels",
	SELLER_HOTELS: "/seller-hotels",
	DELETE_HOTEL: (id) => `/delete-hotel/${id}`,
	READ_HOTEL: (id) => `/hotel/${id}`,
	UPDATE_HOTEL: (id) => `/update-hotel/${id}`
};
