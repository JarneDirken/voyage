import { deleteTrip } from "../api/Trip";
import { GetActivityDetailsDto } from "../dto/activity/GetActivityDetailsDto";
import { GetTripDetailsDto } from "../dto/trip/GetTripDetailsDto";
import { useAuth } from "../hook/useAuth";
import Loading from "./loading";
import { Dispatch, SetStateAction } from "react";
import { deleteActivity } from "../api/Activity";
import { useNavigate } from "react-router-dom";

interface DeletePopupProps {
  trip?: GetTripDetailsDto;
  activity?: GetActivityDetailsDto;
  setRefreshTrigger: (Dispatch<SetStateAction<number>>);
  onClose: (Dispatch<SetStateAction<boolean>>);
};

export default function DeletePopup({ trip, activity, setRefreshTrigger, onClose }: DeletePopupProps) {
  const { userUid } = useAuth();
  const navigate = useNavigate();

  if (!userUid) return <Loading />;

  const removeTrip = async () => {
    if (trip) {
      await deleteTrip(trip.id, userUid);
      navigate("/trips");
    }
  };

  const removeActivity = async () => {
    if (activity) {
      await deleteActivity(activity.id, userUid);
      setRefreshTrigger(prev => prev += 1);
    }
  };

  return(
    <div className="flex flex-col w-full h-full  justify-center items-center gap-2">
      <span className="font-medium text-2xl">Supprimer {trip ? `Voyage ${trip.name}` : activity ? `activity ${activity.name}` : '/'}</span>
      <h1 className="text-2xl">Etes-vous sûr?</h1>
      <div className="flex gap-4 text-2xl">
        <button className="cursor-pointer border border-red-400 bg-red-200 py-2 px-6 rounded-xl" onClick={() => trip ? removeTrip() : activity ? removeActivity() : null}
        >Oui</button>
        <button className="cursor-pointer border border-green-400 bg-green-200 py-2 px-6 rounded-xl" onClick={() => onClose(false)}>Non</button>
      </div>
    </div>
  );
}