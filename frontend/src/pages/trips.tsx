import { useEffect, useState } from "react";
import { GetTripsDto } from "../dto/trip/GetTripsDto";
import { getTrips } from "../api/Trip";
import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import caen from "../assets/caen.png";

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
        <div className="flex flex-col gap-2 px-32">
        <span className="text-3xl font-semibold">Mes voyages</span>
        {trips.length === 0 ? (
          <div>Vous-avez pas encore cree des voyages. Commence <Link to="/trip" className="text-blue-500">la</Link></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto mt-4">
            {trips.map((voyage) => (
              <div key={voyage.id} className="w-full shadow-md border border-gray-200 rounded-md h-full">
                <div className="h-1/3 rounded-t-md">
                  <img src={caen} className="rounded-t-md w-full h-full bg-cover"/>
                </div>
                <div className="p-2 h-2/3 rounded-b-md shadow-md flex flex-col flex-grow gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xl truncate">{voyage.name}</span>
                    {voyage.budget ? <span className="font-semibold text-lg">Budget: €{voyage.budget}</span> : ''}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar />
                    <span className="font-semibold">
                      {new Date(voyage.startDate).toLocaleDateString('fr-FR')}
                      &nbsp;-&nbsp; 
                      {new Date(voyage.endDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMapPin />
                    <span className="font-semibold">{voyage.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                  <span className="font-semibold">{voyage.userFirstName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Activites: {voyage.amountOfActivites ?? 0}</span>
                    <Link to={`/trip/${voyage.id}`} className="bg-black text-white p-2 rounded-xl">Regarder</Link>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/voyage" className="w-full shadow-md border border-gray-200 bg-gray-100 rounded-md h-full flex justify-center items-center">
              <span className="text-5xl text-green-300">+</span>
            </Link>
          </div>
        )}
      </div>
    );
}