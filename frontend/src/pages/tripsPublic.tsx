import { useEffect, useState } from "react";
import { GetTripsDto } from "../dto/trip/GetTripsDto";
import { getPublicTrips } from "../api/Trip";
import TripCards from "../components/tripCards";

export default function TripsPublic() {
    const [trips, setTrips] = useState<GetTripsDto[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await getPublicTrips();
            setTrips(response);
        }

        fetchTrips();
    }, []);
    
    return(
        <div className="flex flex-col gap-2 px-32">
            <span className="text-3xl font-semibold">Public voyages</span>
            {trips.length === 0 ? (
                <div>Il y a 0 public voyages disponible.</div>
            ) : (
                <TripCards 
                    trips={trips}
                />
            )}
        </div>
    );
}