import { useEffect, useState } from "react";
import { GetTripsDto } from "../dto/trip/GetTripsDto";
import { getTrips } from "../api/Trip";
import { Link } from "react-router-dom";
import TripCards from "../components/tripCards";


export default function Trips() {
    const [trips, setTrips] = useState<GetTripsDto[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
          const response = await getTrips();
          setTrips(response);
        }
    
        fetchTrips();
      }, []);

    return(
        <div className="flex flex-col gap-2 px-32">
          <span className="text-3xl font-semibold">Mes voyages</span>
          {trips.length === 0 ? (
            <div>Vous-avez pas encore cree des voyages. Commence <Link to="/trip" className="text-blue-500">la</Link></div>
          ) : (
            <TripCards 
              trips={trips}
            />
          )}
      </div>
    );
}