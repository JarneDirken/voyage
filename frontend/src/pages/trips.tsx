import { useEffect, useState } from "react";
import { GetTripsDto } from "../dto/trip/GetTripsDto";
import { getSharedTrips, getTrips } from "../api/Trip";
import { Link } from "react-router-dom";
import TripCards from "../components/tripCards";
import { useAuth } from "../hook/useAuth";
import Loading from "../components/loading";


export default function Trips() {
    const [trips, setTrips] = useState<GetTripsDto[]>([]);
    const [sharedTrips, setSharedTrips] = useState<GetTripsDto[]>([]);
    const { userUid } = useAuth();

    useEffect(() => {
        const fetchTrips = async () => {
          if (userUid) {
            const response = await getTrips(userUid);
            setTrips(response);
          }
        }

        const fetchSharedTrips = async () => {
          if (userUid) {
            const data = await getSharedTrips(userUid);
            setSharedTrips(data);
          }
        }
    
        fetchSharedTrips();
        fetchTrips();
    }, [userUid]);

    if (!userUid) return <Loading />

    return(
        <div className="flex flex-col gap-2 px-32 p-4" style={{ minHeight: "calc(100vh - 73.6px)" }}>
          <div>
            <span className="text-3xl font-semibold">Mes voyages</span>
            {trips.length === 0 ? (
              <div>Vous-avez pas encore cree des voyages. Commence <Link to="/trip" className="text-blue-500">la</Link></div>
            ) : (
              <TripCards 
                trips={trips}
                hideCreateButton={false}
              />
            )}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-semibold">Mes voyages partagés</span>
            {sharedTrips.length === 0 ? (
              <div>Personne n'a partagé de voyage avec vous.</div>
            ) : (
              <TripCards 
                trips={sharedTrips}
                hideCreateButton={true}
              />
            )}
          </div>
      </div>
    );
}