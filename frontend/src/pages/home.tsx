import { useEffect, useState } from "react";
import { WeatherForecast } from "../models/WeatherForecast";
import { getWeatherForecasts } from "../api/WeaterForecast";

export default function Home() {
    const [data, setData] = useState<WeatherForecast[]>([]);

    useEffect(() => {
      const fetchForecasts = async () => {
        const result = await getWeatherForecasts();
        setData(result);
      };
  
      fetchForecasts();
    }, []);
    
    return(
        <div>
      <h1 className='text-3xl'>Home</h1>
      <div className='flex gap-2'>
        {data.map((item, index) => (
          <div className='flex flex-col p-4 border border-black' key={index}>
            <span>{item.date.toString()}</span>
            <span>{item.temperatureC}</span>
            <span>{item.temperatureF}</span>
            <span>{item.summary}</span>
          </div>
        ))}
      </div>
    </div>
    );
}