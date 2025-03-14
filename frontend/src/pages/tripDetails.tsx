import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTripDetailsDto } from "../dto/trip/GetTripDetailsDto";
import { getTripDetails, updateTrip } from "../api/Trip";
import Loading from "../components/loading";
import { FiCalendar, FiTrash2, FiEdit2 } from "react-icons/fi";
import Modal from 'react-modal';
import caen from "../assets/caen.png";
import { customStyles } from "../services/modelStyles";
import { UpdateTripDto } from "../dto/trip/UpdateTripDto";
import { useAuth } from "../hook/useAuth";
import ActivityCard from "../components/activityCard";
import DeletePopup from "../components/deletePopup";
import EditPopup from "../components/editPopup";

export default function TripDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState<GetTripDetailsDto>();
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [refreshTrigger, setRefreshTrigger] =useState<number>(0);
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const { userUid } = useAuth();

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
            setIsPublic(!trip.isPublic);
        }
    }, [trip]);

    if (!trip || !userUid || !id) return <Loading />;

    const hasOwnership = userUid == trip.userUid;

    const makeTripPoublic = async () => {
        const publicTrip: UpdateTripDto = {
            id: trip.id,
            isPublic,
            userUid
        }

        await updateTrip(publicTrip);
        setRefreshTrigger(prev => prev + 1)
    };

    const goBack = () => {
        navigate(-1);
    };
    
    return (
        <div className="h-full">
        {showEditModal && (
            <Modal
                isOpen={showEditModal}
                onRequestClose={() => setShowEditModal(false)}
                style={customStyles}
                appElement={document.getElementById('contentChecklists') || undefined}
            >
                <EditPopup 
                    trip={trip}
                    onClose={() => setShowEditModal(false)}
                    setRefreshTrigger={setRefreshTrigger}
                />
            </Modal>
        )}

        {showDeletePopup && (
            <Modal
                isOpen={showDeletePopup}
                onRequestClose={() => setShowDeletePopup(false)}
                style={customStyles}
                appElement={document.getElementById('contentChecklists') || undefined}
            >
                <DeletePopup
                    trip={trip}
                    setRefreshTrigger={setRefreshTrigger}
                    onClose={() => setShowDeletePopup(false)}
                />
            </Modal>
        )}
        <div className="flex flex-col px-32" id="contentChecklists">
            <div className="absolute top-0 left-0 -z-10 w-full h-[300px]">
            <img src={!trip.imageUrl ? caen : `${import.meta.env.VITE_SERVER_DEVELOPEMENT}${trip.imageUrl}`} className="w-full h-full filter blur-xs" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20" />
            </div>
            {trip?.budget && (
                <div className="mt-24 bg-white p-2 rounded-lg flex justify-center items-center flex-col">
                    {/* Budget amount on top of the bar */}
                    <span className="font-semibold text-xl">{`€ ${trip.budget}`}</span>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className="h-2 rounded-full"
                            style={{
                                width: `${Math.min((trip.totalActivityCost / trip.budget) * 100, 100)}%`, // Ensure max width is 100%
                                backgroundColor:
                                    (trip.totalActivityCost / trip.budget) * 100 >= 100
                                        ? 'red' // Over budget
                                        : '#4CAF50', // Green
                            }}
                        />
                    </div>

                    {/* Message for over budget */}
                    {trip.totalActivityCost > trip.budget && (
                        <span className="text-red-500 mt-2">
                            {`€ ${(trip.totalActivityCost - trip.budget).toFixed(2)} hors budget`}
                        </span>
                    )}
                </div>
            )}
            <div className={`mt-10 bg-white rounded-lg p-4 shadow-2xl flex flex-col gap-2 ${trip.budget ? '' : 'mt-24'}`}>
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-semibold">{trip?.name} - {trip?.location}</span>
                {userUid == trip.userUid && (
                    <div className="flex gap-4">
                        <FiEdit2 className="text-xl cursor-pointer text-gray-800 hover:scale-105 transition ease-in-out" onClick={() => setShowEditModal(true)}/>
                        <FiTrash2 className="text-xl cursor-pointer text-red-600 hover:scale-105 transition ease-in-out" onClick={() => setShowDeletePopup(true)} />
                    </div>
                )}
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
                    <span>Total activite cout est: €{(trip.totalActivityCost).toFixed(2)}</span>
                    <span>Il reste: €{(trip.budget-trip.totalActivityCost).toFixed(2)}</span>
                </div>
            )}
            <div className="flex flex-row justify-between items-center">
                <div>
                    Invite:&nbsp;
                    {trip.usersInvitedEmail.map((email) => (
                        <span key={email}>{email},&nbsp;</span>
                    ))} 
                </div>
                <div className="flex gap-4">
                    {userUid == trip.userUid && (
                        <>
                            <button className="text-white bg-black px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition ease-in-out" onClick={makeTripPoublic}>{trip.isPublic ? "Non Publier" : "Publier"}</button>
                            <button className="text-white bg-black px-4 py-2 rounded-xl cursor-not-allowed">Invite</button>
                        </>
                    )}
                    <button onClick={goBack} className="text-white bg-black px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition ease-in-out">Retour</button>
                </div>
            </div>
            </div>
            <div className="mt-8">
                <ActivityCard
                    activities={trip.activities}
                    id={id}
                    hasOwnership={hasOwnership}
                    peopleInvited={trip.usersInvited}
                    setRefreshTrigger={setRefreshTrigger}
                />
            </div>
        </div>
        </div>
    );
}