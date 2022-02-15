import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

async function signOut() {
	await window.localStorage.removeItem("auth");
	return null;
}
export const useLogoutMutation = () => {
	const { logout } = useAuthContext();
	return useMutation(() => signOut(), {
		onSuccess: (_data) => {
			// Cookies.remove("auth_token");
			logout(_data);
			toast.success("You have logged out successfully.");
		},
		onError: ({ response: { data } }) => {
			console.log(data, "logout error response");
		}
	});
};
