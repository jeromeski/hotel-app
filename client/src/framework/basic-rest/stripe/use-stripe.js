import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { updateUserInLocalStorage } from "utils";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import { http_stripe } from "../utils/http";

async function connectAccount() {
	return await http_stripe.post(API_ENDPOINTS.STRIPE_CONNECT);
}

export function useStripeConnectMutation() {
	return useMutation(() => connectAccount(), {
		onSuccess: ({ data }) => {
			window.location.href = data;
		},
		onError: ({ data }) => {
			console.log(data);
			toast.error("Stripe connect failed, Try again.");
		}
	});
}

async function accountStatus() {
	return await http_stripe.post(API_ENDPOINTS.STRIPE_STATUS);
}

export function useStripeStatusMutation() {
	const { updateWithStripe } = useAuthContext();

	return useMutation(() => accountStatus(), {
		onSuccess: ({ data }) => {
			updateUserInLocalStorage(data);
			updateWithStripe(data);
			toast.success("You have successfully connected with stripe!");
		},
		onError: ({ response: { data } }) => {
			console.log(data);
		}
	});
}

async function accountBalance() {
	return await http_stripe.post(API_ENDPOINTS.STRIPE_BALANCE);
}

export function useStripeBalanceMutation() {
	return useMutation(() => accountBalance(), {
		onSuccess: ({ data }) => {
			console.log("Stripe balance =>", data);
		},
		onError: ({ response: { data } }) => {
			console.log(data);
		}
	});
}

async function payoutSettings() {
	return await http_stripe.post(API_ENDPOINTS.STRIPE_SETTINGS);
}

export function useStripeSettingsMutation() {
	return useMutation(() => payoutSettings(), {
		onSuccess: ({ data }) => {
			window.location.href = data.url;
		},
		onError: ({ response: { data } }) => {
			console.log(data);
		}
	});
}

async function getSessionId(hotelId) {
	return await http_stripe.post(API_ENDPOINTS.STRIPE_SESSION, { hotelId });
}

export function useStripeSessionMutation() {
	return useMutation((id) => getSessionId(id), {
		onSuccess: ({ data }) => {
			console.log(data);
		},
		onError: ({ response: { error } }) => {
			console.log(error);
		}
	});
}

async function onPaymentSuccess(hotelId) {
	return await http_stripe.post(API_ENDPOINTS.STRIPE_PAYMENT_SUCCESS, { hotelId });
}

export function useStripeSuccessRequest() {
	return useMutation((id) => onPaymentSuccess(id), {
		onSuccess: ({ data }) => {},
		onError: ({ error }) => {}
	});
};

