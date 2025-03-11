import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetTripDetailsDto } from "../dto/trip/GetTripDetailsDto";
import { deleteTrip, getTripDetails, updateTrip } from "../api/Trip";
import Loading from "../components/loading";
import { FiCalendar, FiTrash2, FiEdit2 } from "react-icons/fi";
import Modal from 'react-modal';
import caen from "../assets/caen.png";
import { customStyles } from "../services/modelStyles";
import EditTripModal from "../components/editTripModal";
import { UpdateTripDto } from "../dto/trip/UpdateTripDto";

export default function TripDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState<GetTripDetailsDto>();
    const [showModel, setShowModel] = useState<boolean>(false);
    const [refreshTrigger, setRefreshTrigger] =useState<number>(0);
    const [isPublic, setIsPublic] = useState<boolean>(false);

    useEffect(() => {
        const fetchTripDetails = async () => {
          if (id) {
            const result = await getTripDetails(parseInt(id));
            setTrip(result);
          }
        };
    
        fetchTripDetails();
    }, [id, refreshTrigger]);

    useEffect(() => {
        if (trip) {
            setIsPublic(trip.isPublic);
        }
    }, [trip]);

    if (!trip) return <Loading />;

    const removeTrip = async () => {
        await deleteTrip(trip.id);
        navigate("/voyages");
    };

    const makeTripPoublic = async () => {
        const publicTrip: UpdateTripDto = {
            id: trip.id,
            isPublic
        }

        await updateTrip(publicTrip);
        setRefreshTrigger(prev => prev + 1)
    };
    
    return (
        <div className="h-full">
        <Modal
            isOpen={showModel}
            onRequestClose={() => setShowModel(false)}
            style={customStyles}
            appElement={document.getElementById('contentChecklists') || undefined}
        >
            <EditTripModal 
                trip={trip}
                onClose={() => setShowModel(false)}
                setRefreshTrigger={setRefreshTrigger}
            />
        </Modal>
        <div className="flex flex-col px-32">
            <div className="absolute top-0 left-0 -z-10 w-full h-[300px]">
            <img src={caen} className="w-full h-full filter blur-xs" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20" />
            </div>
            {trip?.budget && (
            <div className="mt-24 bg-white p-2 rounded-lg flex justify-center items-center">
                € {trip.budget}
            </div>
            )}
            <div className="mt-10 bg-white rounded-lg p-4 shadow-2xl flex flex-col gap-2">
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-semibold">{trip?.name} - {trip?.location}</span>
                <div className="flex gap-4">
                <FiEdit2 className="text-xl cursor-pointer" onClick={() => setShowModel(true)}/>
                <FiTrash2 className="text-xl cursor-pointer" onClick={removeTrip} />
                </div>
            </div>
            <div className="flex items-center gap-1">
                <FiCalendar />
                <span className="font-semibold">
                {new Date(trip.startDate).toLocaleDateString('fr-FR')}
                &nbsp;-&nbsp; 
                {new Date(trip.endDate).toLocaleDateString('fr-FR')}
                </span>
            </div>
            {trip?.budget && (
                <div className="flex flex-col">
                <span>Total budget est: €{trip?.budget}</span>
                <span>Total activite cout est: €</span>
                </div>
            )}
            <div className="flex flex-row justify-between items-center">
                <span>Invite: /</span>
                <div className="flex gap-4">
                <button className="text-white bg-black px-4 py-2 rounded-xl cursor-pointer" onClick={makeTripPoublic}>{trip.isPublic ? "Non Publier" : "Publier"}</button>
                <button className="text-white bg-black px-4 py-2 rounded-xl">Invite</button>
                <Link to="/voyages" className="text-white bg-black px-4 py-2 rounded-xl">Back</Link>
                </div>
            </div>
            </div>
            <div className="mt-8">
            Activites
            </div>
        </div>
        </div>
    );
}