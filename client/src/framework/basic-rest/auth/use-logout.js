import { useAuthContext } from "context/Auth";
import { useMutation } from "react-query";

async function signOut() {
	return {
		ok: true,
		message: "Logout Successful!"
	};
}
export const useLogoutMutation = () => {
	const { logout } = useAuthContext();
	return useMutation(() => signOut(), {
		onSuccess: (_data) => {
			// Cookies.remove("auth_token");
			logout();
		},
		onError: (data) => {
			console.log(data, "logout error response");
		}
	});
};
