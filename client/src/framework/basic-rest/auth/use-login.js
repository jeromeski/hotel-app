import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import _http from "../utils/http";
import { toast } from "react-toastify";


async function signIn(input) {
	return await _http.post(API_ENDPOINTS.LOGIN, input);
}

export function useLoginMutation() {
	const { login } = useAuthContext();
	return useMutation((input) => signIn(input), {
		onSuccess: ({ data }) => {
			window.localStorage.setItem("auth", JSON.stringify({ token: data.token, user: data.user }));
			login({ token: data.token, user: data.user });
			toast.success("Login successful!");
		},
		onError: ({ response: { data } }) => {
			console.log(data);
			toast.error(data);
		}
	});
}
