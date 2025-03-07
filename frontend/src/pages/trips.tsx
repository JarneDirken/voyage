import { useEffect, useState } from "react";
import { GetTripsDto } from "../dto/trip/GetTripsDto";
import { getTrips } from "../api/Trip";

export default function Trips() {
    const [trips, setTrips] = useState<GetTripsDto[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
          const response = await getTrips();
          setTrips(response);
        }
    
        fetchTrips();
      }, []);

      useEffect(() => {
        console.log(trips);
      }, [trips]);

    return(
        <div>
            Trips
        </div>
    );
}