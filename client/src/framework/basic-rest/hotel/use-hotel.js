import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import http_auth, { http_hotel } from "../utils/http";

async function createHotel(input) {
	return await http_hotel.post(API_ENDPOINTS.CREATE_HOTEL, input);
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

async function getAllHotels() {
	return await http_auth.get(API_ENDPOINTS.HOTELS);
}

export function useGetHotelsMutation() {
	return useMutation(() => getAllHotels(), {});
}

async function getSellerHotels() {
	return await http_hotel.get(API_ENDPOINTS.SELLER_HOTELS);
}

export function useGetSellerHotelsMutation() {
	return useMutation(() => getSellerHotels(), {});
}

async function deleteHotel(id) {
	return await http_hotel.delete(API_ENDPOINTS.DELETE_HOTEL(id));
}

export function useDeleteHotelMutation() {
	return useMutation((id) => deleteHotel(id), {});
}

async function readHotel(id) {
	return await http_auth.get(API_ENDPOINTS.READ_HOTEL(id));
}

export function useReadHotelMutation() {
	return useMutation((id) => readHotel(id), {});
}

async function updateHotel({ input, id }) {
	return await http_hotel.put(API_ENDPOINTS.UPDATE_HOTEL(id), input);
}

export function useUpdateHotelMutation() {
	return useMutation((data) => updateHotel(data), {
		onSuccess: () => {
			toast.success("Hotel Updated Successfully!");
		},
		onError: ({ res: { data } }) => {
			toast.error(data.message);
		}
	});
}

