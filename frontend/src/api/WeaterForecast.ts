import axios from "axios";

const api_url = "https://localhost:7053/WeatherForecast";

export async function getWeatherForecasts() {
    const token = localStorage.getItem("token");
    const response = await axios.get(api_url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}