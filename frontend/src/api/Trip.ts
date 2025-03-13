import axios from "axios";
import { CreateTripDto } from "../dto/trip/CreateTripDto";
import { UpdateTripDto } from "../dto/trip/UpdateTripDto";
import { API_URL } from "../services/config";

const tripApiUrl = `${API_URL}/api/Trip`;
const token = localStorage.getItem("token");

export async function createTrip(tripData: CreateTripDto) {
  const formData = new FormData();
    formData.append("name", tripData.name);
    formData.append("location", tripData.location);
    formData.append("startDate", tripData.startDate ? tripData.startDate.toISOString() : "");
    formData.append("endDate", tripData.endDate ? tripData.endDate.toISOString() : "");
    if (tripData.budget !== undefined && tripData.budget !== null) {
      formData.append("budget", tripData.budget.toString());
    }  
    formData.append("userUid", tripData.userUid);
    
    if (tripData.image) {
        formData.append("image", tripData.image);
    }
    const response = await axios.post(tripApiUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
};

export async function getTrips(userUid: string) {
    const response = await axios.get(tripApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        userUid
      }
    });
    return response.data;
};

export async function getPublicTrips() {
  const response = await axios.get(tripApiUrl+"/Public", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export async function getTripDetails(id: number) {
    const response = await axios.get(tripApiUrl+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
};
  
export async function updateTrip(dto: UpdateTripDto) {
    const response = await axios.patch(tripApiUrl, dto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
};
  
export async function deleteTrip(id: number, userUid: string) {
    const response = await axios.delete(tripApiUrl+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        userUid
      }
    });
    return response.data;
};