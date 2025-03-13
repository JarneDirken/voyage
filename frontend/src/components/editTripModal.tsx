import { Dispatch, SetStateAction, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import { GetTripDetailsDto } from "../dto/trip/GetTripDetailsDto";
import { UpdateTripDto } from "../dto/trip/UpdateTripDto";
import { updateTrip } from "../api/Trip";
import { useAuth } from "../hook/useAuth";

interface modalProps {
  trip: GetTripDetailsDto;
  onClose: (Dispatch<SetStateAction<boolean>>);
  setRefreshTrigger: (Dispatch<SetStateAction<number>>);
}

export default function EditTripModal({ trip, onClose, setRefreshTrigger } : modalProps) {
  const [name, setName] = useState<string>(trip.name);
  const [location, setLocation] = useState<string>(trip.location);
  const [startDate, setStartDate] = useState<Date | null>(trip.endDate);
  const [endDate, setEndDate] = useState<Date | null>(trip.startDate);
  const [budget, setBudget] = useState<number | null>(trip.budget ?? null);
  const { userUid } = useAuth();
  const [error, setError] = useState<string>("");

  const update = async () => {
    if (!userUid) {
      return;
    }

    const dto: UpdateTripDto = {
      id: trip.id,
      name,
      location,
      startDate,
      endDate,
      budget,
      userUid
    };

    try {
      await updateTrip(dto);
      setRefreshTrigger(prev => prev + 1);
      onClose(false);
    } catch (err) {
      setError("An error occurred while updating the trip. Please try again: " + err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update();
  };

  return(
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex justify-between border-b border-b-BGPrimary w-full text-TXTPrimary items-center">
        <span className="font-medium text-2xl">Modifier trip: {trip.name}</span>
        <RiCloseLargeFill className="hover:cursor-pointer size-6" onClick={() => onClose(false)}/>
      </div>
      <form className='flex flex-col gap-8 w-full h-full' onSubmit={handleSubmit}>
        {/* Name, location */}
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Nom de voyage <span className="text-red-400">*</span></span>
            <input
              required
              className="p-2 border border-gray-300 rounded-xl w-full"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Localisation <span className="text-red-400">*</span></span>
            <input
              required
              className="p-2 border border-gray-300 rounded-xl w-full"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        {/* Date pickers */}
        <div className="flex flex-row gap-4 w-full">
           <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Start date <span className="text-red-400">*</span></span>
              <DatePicker
                required
                className="p-2 border border-gray-300 rounded-xl"
                selected={startDate} 
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">End date <span className="text-red-400">*</span></span>
              <DatePicker
                required
                className="p-2 border border-gray-300 rounded-xl"
                selected={endDate} 
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
        </div>
        {/* BUDGET */}
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Budget</span>
          <input 
            className="p-2 border border-gray-300 rounded-xl w-1/2"
            type="number"
            value={budget || ""}
            onChange={(e) => setBudget(e.target.value ? parseFloat(e.target.value) : null)}
            min="0"
            step="0.01"
          />
        </div>
        <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl w-fit hover:scale-105 transition ease-in-out">
            Update Voyage
        </button>

        {error && (
                        <div className="text-red-600 font-semibold textlg">{error}</div>
                    )}
      </form>
    </div>
  );
}