import axios from "axios";
import { CreateUserDto } from "../dto/user/CreateUserDTo";
import { API_URL } from "../services/config";

const userApiUrl = `${API_URL}/api/User`;

export async function createAccount(dto: CreateUserDto) {
  const response = await axios.post(userApiUrl+"/Register", dto);

  return response.data;
};