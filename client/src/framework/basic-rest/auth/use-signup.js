import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import http_auth from "../utils/http";
import { toast } from "react-toastify";

async function signUp(input) {
	return await http_auth.post(API_ENDPOINTS.REGISTER, input);
}

export function useSignupMutation() {
	const { register } = useAuthContext();
	return useMutation((input) => signUp(input), {
		onSuccess: ({ data }) => {
			console.log(data);
			register(data);
			toast.success("Registration successful! Login to access your account.");
		},
		onError: ({ response: { data } }) => {
			console.log(data);
			toast.error(data);
		}
	});
}
