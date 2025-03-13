import { GetTripsDto } from "../dto/trip/GetTripsDto";
import { FiMapPin, FiCalendar, FiEye } from "react-icons/fi";
import caen from "../assets/caen.png";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../services/config";

interface TripCardsProps {
    trips: GetTripsDto[];
}

export default function TripCards({ trips }: TripCardsProps) {
    const location = useLocation();
    const isTripsPage = () => location.pathname === "/trips";

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto mt-4">
            {Array.isArray(trips) && trips.length > 0 ? (
                trips.map((voyage) => (
                    <div key={voyage.id} className="w-full shadow-md border border-gray-200 rounded-md h-full max-h-80">
                        <div className="h-1/3 rounded-t-md">
                            <img
                                src={!voyage.imageUrl ? caen : `${API_URL}${voyage.imageUrl}`}
                                className="rounded-t-md w-full h-full bg-cover"
                            />
                        </div>
                        <div className="p-2 h-2/3 rounded-b-md shadow-md flex flex-col flex-grow gap-0.5">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-xl truncate">{voyage.name}</span>
                                {voyage.budget ? <span className="font-semibold text-lg">Budget: €{voyage.budget}</span> : ''}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <FiCalendar />
                                <span className="font-semibold">
                                    {new Date(voyage.startDate).toLocaleDateString('fr-FR')}
                                    &nbsp;-&nbsp;
                                    {new Date(voyage.endDate).toLocaleDateString('fr-FR')}
                                </span>
                            </div>
                            <div className={`${isTripsPage() ? 'flex justify-between items-center' : ''}`}>
                                <div className="flex items-center gap-1 my-2">
                                    <FiMapPin />
                                    <span className="font-semibold">{voyage.location}</span>
                                </div>
                                {voyage.isPublic && isTripsPage() && (
                                    <div>
                                        <FiEye />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">{voyage.userFirstName}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm">Activites: {voyage.amountOfActivities ?? 0}</span>
                                <Link to={`/trip/${voyage.id}`} className="bg-black text-white p-2 rounded-xl hover:scale-105 transition ease-in-out">Regarder</Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No trips available</div>
            )}

            {isTripsPage() && (
                <Link to="/trip" className="w-full shadow-md border border-gray-200 bg-gray-100 rounded-md h-full flex justify-center items-center min-h-80">
                    <span className="text-5xl text-green-300">+</span>
                </Link>
            )}
        </div>
    );
}