import axios from "axios";
import { CreateTripDto } from "../dto/trip/CreateTripDto";

const api_url = "https://localhost:7053/api/Trip";

export async function createTrip(dto: CreateTripDto) {
    const response = await axios.post(api_url, dto);
    return response;
};

export async function getTrips() {
    const response = await axios.get(api_url);
    return response.data;
};