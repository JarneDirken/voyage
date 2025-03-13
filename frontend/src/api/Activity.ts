import axios from "axios";
import { CreateActivityDto } from "../dto/activity/CreateActivityDto";
import { API_URL } from "../services/config";

const activityApiUrl = `${API_URL}/api/Activity`;
const token = localStorage.getItem("token");

export async function createActivity(activityData: CreateActivityDto) {
  const response = await axios.post(activityApiUrl, activityData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export async function deleteActivity(id: number, userUid: string) {
  const response = await axios.delete(activityApiUrl+`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      userUid
    }
  });
  return response.data;
};