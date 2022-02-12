import { useAuthContext } from "context/app";
import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import _http from "../utils/http";

async function signUp(input) {
	return await _http.post(API_ENDPOINTS.REGISTER, input);
}

export function useSignupMutation() {
	const { register } = useAuthContext();
	return useMutation((input) => signUp(input), {
		onSuccess: (data) => {
			register(data);
		},
		onError: (data) => {
			console.log(data, "error signing up");
		}
	});
}
