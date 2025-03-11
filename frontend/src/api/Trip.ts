import axios from "axios";
import { CreateTripDto } from "../dto/trip/CreateTripDto";
import { UpdateTripDto } from "../dto/trip/UpdateTripDto";

const api_url = "https://localhost:7053/api/Trip";
const token = localStorage.getItem("token");

export async function createTrip(dto: CreateTripDto) {
    const response = await axios.post(api_url, dto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
};

export async function getTrips() {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
};

export async function getTripDetails(id: number) {
    const response = await axios.get(api_url+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };
  
  export async function updateTrip(dto: UpdateTripDto) {
    const response = await axios.patch(api_url, dto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };
  
  export async function deleteTrip(id: number) {
    const response = await axios.delete(api_url+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };