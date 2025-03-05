import axios from "axios";

const api_url = "https://localhost:7053/WeatherForecast";

export async function getWeatherForecasts() {
    const response = await axios.get(api_url);
    return response.data
}