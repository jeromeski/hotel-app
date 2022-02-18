import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import { _httpHotel } from "../utils/http";

async function createHotel(input) {
	return await _httpHotel.post(API_ENDPOINTS.CREATE_HOTEL, input);
}

export function useCreateHotelMutation() {
	return useMutation((input) => createHotel(input), {
		onSuccess: ({ data }) => {
			toast.success("Hotel created successfully!");
		},
		onError: ({ response: { data } }) => {
			toast.error("Hotel creation failed!");
			console.log(data);
		}
	});
}
