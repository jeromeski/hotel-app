import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { updateUserInLocalStorage } from "utils";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import { _httpStripe } from "../utils/http";

async function connectAccount() {
	return await _httpStripe.post(API_ENDPOINTS.STRIPE_CONNECT);
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
	return await _httpStripe.post(API_ENDPOINTS.STRIPE_STATUS);
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
	return await _httpStripe.post(API_ENDPOINTS.STRIPE_BALANCE);
}

export function useStripeBalanceMutation() {
	return useMutation(() => accountBalance(), {
		onSuccess: ({ data }) => {
			console.log(data);
		},
		onError: ({ response: { data } }) => {
			//
		}
	});
}