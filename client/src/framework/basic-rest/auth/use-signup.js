import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import _http from "../utils/http";
import { toast } from "react-toastify";

async function signUp(input) {
	return await _http.post(API_ENDPOINTS.REGISTER, input);
}

export function useSignupMutation() {
	const { register } = useAuthContext();
	return useMutation((input) => signUp(input), {
		onSuccess: (data) => {
			register(data);
			toast.success("Registration successful! Login to access your account.");
		},
		onError: (data) => {
			console.log(data);
			toast.error("Something went wrong with your registration. Please try again later.");
		}
	});
}
